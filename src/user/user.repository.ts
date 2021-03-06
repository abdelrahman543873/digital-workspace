import { Pagination } from './../shared/utils/pagination.input';
import { LookupSchemasEnum } from './../app.const';
import { hashPass } from './../shared/utils/bcryptHelper';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AggregatePaginateModel,
  Model,
  ObjectId,
  QueryWithHelpers,
  Types,
  UpdateWriteOpResult,
} from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddUserInput } from './inputs/add-user.input';
import { hashPassSync } from '../shared/utils/bcryptHelper';
import { buildUserParams, UserType } from './user.seed';
import { TestUser, TestUserDocument } from './schema/test-user.schema';
import { AddFavWidgetInput } from './inputs/add-fav-widget.input';
import { ManageFollowUserInput } from './inputs/manage-follow-user.input';
import { SearchUserInput } from './inputs/search-user.input';
import { GetUserByIdInput } from './inputs/get-user-by-id.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { GetStatsInput } from './inputs/get-stats.input';
import { GetHierarchyInput } from './inputs/get-hierarchy.input';
import { HidePostInput } from './inputs/hide-post.input';
import { UpdateUserByIdInput } from './inputs/update-user-by-id.input';
import { GetUserByBirthDate } from './inputs/get-user-by-birthdate.input';
import { DeleteUserInput } from './inputs/delete-user-by-id.input';
import xlsx from 'node-xlsx';
import fs from 'fs';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { BaseHttpException } from '../shared/exceptions/base-http-exception';
import { GetUserListInput } from './inputs/get-user-list.input';
@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User.name)
    private userSchema: AggregatePaginateModel<UserDocument>,
    @InjectModel(TestUser.name) private testUserSchema: Model<TestUserDocument>,
    private httpService: HttpService,
    private logger: Logger,
  ) {
    super(userSchema);
  }

  async addUser(
    input: AddUserInput,
    files: {
      profilePic?: Express.Multer.File[];
      coverPic?: Express.Multer.File[];
    },
  ) {
    return (
      await this.userSchema.create({
        ...input,
        ...(input.password && { password: await hashPass(input.password) }),
        ...(files?.coverPic && {
          coverPic: `${process.env.HOST}${files.coverPic[0].filename}`,
        }),
        ...(files?.profilePic && {
          profilePic: `${process.env.HOST}${files.profilePic[0].filename}`,
        }),
      })
    ).toJSON();
  }

  async getTestUsers() {
    return await this.testUserSchema.find();
  }

  async seedUsers() {
    const verifyExistingTestUsers = await this.testUserSchema.findOne();
    if (verifyExistingTestUsers) return await this.testUserSchema.find();
    const users: UserType[] = [];
    for (let i = 0; i < 10; i++) {
      const params = await buildUserParams();
      users.push(params);
    }
    await this.testUserSchema.deleteMany({});
    await this.userSchema.deleteMany({});
    await this.testUserSchema.insertMany(
      users.map((user) => {
        return { email: user.email, password: user.password };
      }),
    );
    return await this.userSchema.insertMany(
      users.map((user) => {
        return { ...user, password: hashPassSync(user.password) };
      }),
    );
  }

  async addFavWidget(userId: ObjectId, input: AddFavWidgetInput) {
    return await this.userSchema.findOneAndUpdate(
      { _id: userId },
      { widgets: input.widgets },
      { new: true },
    );
  }

  async searchUser(input: SearchUserInput) {
    const aggregation = this.userSchema.aggregate([
      {
        $match: {
          $or: [
            { email: { $regex: input.keyword, $options: 'i' } },
            { fullName: { $regex: input.keyword, $options: 'i' } },
          ],
        },
      },
      { $match: { isCompany: false } },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          foreignField: '_id',
          localField: 'directManagerId',
          as: 'directManager',
        },
      },
      {
        $addFields: {
          directManager: {
            $cond: {
              if: { $eq: [{ $size: '$directManager' }, 1] },
              then: { $arrayElemAt: ['$directManager', 0] },
              else: {},
            },
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return await this.userSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  async manageFollow(userId: ObjectId, input: ManageFollowUserInput) {
    await this.userSchema.updateMany(
      {
        $or: [{ _id: userId }, { _id: new Types.ObjectId(input.userId) }],
      },
      [
        // a pipeline to update followed and following user with the follower id
        {
          $set: {
            following: {
              $cond: [
                {
                  $eq: ['$_id', userId],
                },
                {
                  $cond: [
                    {
                      $in: [new Types.ObjectId(input.userId), '$following'],
                    },
                    {
                      $setDifference: [
                        '$following',
                        [new Types.ObjectId(input.userId)],
                      ],
                    },
                    {
                      $concatArrays: [
                        '$following',
                        [new Types.ObjectId(input.userId)],
                      ],
                    },
                  ],
                },
                '$following',
              ],
            },
            followers: {
              $cond: [
                // increases the followers in case this follower doesn't exist
                // decrease the followers of the followed person if the follower already exists
                {
                  $eq: ['$_id', new Types.ObjectId(input.userId)],
                },
                {
                  $cond: [
                    {
                      $in: [userId, '$followers'],
                    },
                    {
                      $setDifference: ['$followers', [userId]],
                    },
                    {
                      $concatArrays: ['$followers', [userId]],
                    },
                  ],
                },
                // if the _id doesn't match the followed person _id do nothing
                '$followers',
              ],
            },
          },
        },
      ],
    );
    return await this.userSchema.findOne({ _id: userId });
  }

  async getUserById(input: GetUserByIdInput): Promise<User> {
    return await this.userSchema.findOne({ _id: new Types.ObjectId(input.id) });
  }

  async recommendUsers(userId: ObjectId, pagination: Pagination) {
    const aggregation = this.userSchema.aggregate([
      {
        $match: {
          _id: userId,
          isCompany: false,
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          let: { usersFollowers: '$following', loggedUserId: '$_id' },
          pipeline: [
            {
              $addFields: {
                commonToBoth: {
                  $setIntersection: ['$$usersFollowers', '$followers'],
                },
              },
            },
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $cond: [
                        { $ifNull: ['$commonToBoth', false] },
                        true,
                        false,
                      ],
                    },
                    { $gte: [{ $size: '$commonToBoth' }, 1] },
                    { $not: { $in: ['$$loggedUserId', '$followers'] } },
                  ],
                },
              },
            },
            {
              $project: { commonToBoth: 0 },
            },
          ],
          as: 'users',
        },
      },
      { $project: { users: 1, _id: 0 } },
      { $unwind: '$users' },
      { $replaceRoot: { newRoot: '$users' } },
      { $sort: { createdAt: -1 } },
    ]);
    return await this.userSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }

  async updateUser(
    userId: ObjectId,
    input: UpdateUserInput,
    files: {
      profilePic?: Express.Multer.File[];
      coverPic?: Express.Multer.File[];
    },
  ) {
    const { newPassword, ...filteredInput } = input;
    return await this.userSchema.findOneAndUpdate(
      { _id: userId },
      {
        ...filteredInput,
        ...(newPassword && { password: hashPassSync(newPassword) }),
        ...(files?.coverPic && {
          coverPic: `${process.env.HOST}${files.coverPic[0].filename}`,
        }),
        ...(files?.profilePic && {
          profilePic: `${process.env.HOST}${files.profilePic[0].filename}`,
        }),
      },
      { new: true },
    );
  }

  async updateUserById(
    input: UpdateUserByIdInput,
    files: {
      profilePic?: Express.Multer.File[];
      coverPic?: Express.Multer.File[];
    },
  ) {
    const { ...filteredInput } = input;
    return await this.userSchema.findOneAndUpdate(
      { _id: input.userId },
      {
        ...filteredInput,
        ...(files?.coverPic && {
          coverPic: `${process.env.HOST}${files.coverPic[0].filename}`,
        }),
        ...(files?.profilePic && {
          profilePic: `${process.env.HOST}${files.profilePic[0].filename}`,
        }),
        ...(input.newPassword && { password: hashPassSync(input.newPassword) }),
      },
      { new: true },
    );
  }

  async getStats(userId: ObjectId, input: GetStatsInput) {
    const chosenId = input.userId ? new Types.ObjectId(input.userId) : userId;
    return (
      await this.userSchema.aggregate([
        {
          $match: {
            $expr: { $eq: [chosenId, '$_id'] },
          },
        },
        {
          $addFields: { followers: { $size: '$followers' } },
        },
        {
          $lookup: {
            from: LookupSchemasEnum.posts,
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: [chosenId, '$userId'],
                  },
                },
              },
            ],
            as: 'posts',
          },
        },
        {
          $addFields: { posts: { $size: '$posts' } },
        },
        {
          $lookup: {
            from: LookupSchemasEnum.groups,
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: [chosenId, '$members'],
                  },
                },
              },
            ],
            as: 'groups',
          },
        },
        {
          $addFields: { groups: { $size: '$groups' } },
        },
        {
          $lookup: {
            from: LookupSchemasEnum.pages,
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: [chosenId, '$likes'],
                  },
                },
              },
            ],
            as: 'likes',
          },
        },
        {
          $addFields: { pages: { $size: '$likes' } },
        },
        {
          $project: {
            pages: 1,
            groups: 1,
            posts: 1,
            followers: 1,
            _id: 0,
          },
        },
      ])
    )[0];
  }

  async checkUserExists(userId: string) {
    return await this.userSchema.count({ _id: new Types.ObjectId(userId) });
  }

  async getHierarchy(user: User, input: GetHierarchyInput) {
    const chosenId = input.userId ? new Types.ObjectId(input.userId) : user._id;
    return (
      await this.userSchema.aggregate([
        {
          $match: {
            $expr: { $eq: ['$_id', chosenId] },
          },
        },
        {
          $lookup: {
            from: LookupSchemasEnum.users,
            as: 'subordinates',
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$directManagerId', chosenId] },
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: LookupSchemasEnum.users,
            as: 'manager',
            localField: 'directManagerId',
            foreignField: '_id',
          },
        },
        { $unwind: '$manager' },
      ])
    )[0];
  }

  async getMostFollowed(pagination: Pagination) {
    const aggregation = this.userSchema.aggregate([
      { $match: { $expr: { $eq: ['$isCompany', false] } } },
      {
        $addFields: { followersSize: { $size: '$followers' } },
      },
      { $sort: { followersSize: -1 } },
      { $project: { followersSize: 0 } },
    ]);
    return await this.userSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }

  async hidePost(userId: ObjectId, input: HidePostInput) {
    return await this.userSchema.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { hiddenPosts: input.postId } },
      { new: true },
    );
  }

  async getUserByBirthDate(input: GetUserByBirthDate) {
    // formatting the date correctly for the mongodb query
    const dateArray = new Date(input.date || Date.now())
      .toISOString()
      .split('-');
    dateArray.shift();
    dateArray[1] = dateArray[1].substring(0, 2);
    const aggregation = this.userSchema.aggregate([
      {
        $match: {
          $expr: {
            $eq: [
              { $dateToString: { format: '%m/%d', date: '$birthDate' } },
              dateArray.join('/'),
            ],
          },
        },
      },
    ]);
    return await this.userSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  async deleteUserById(input: DeleteUserInput) {
    return await this.userSchema.findOneAndDelete({
      _id: new Types.ObjectId(input.userId),
    });
  }

  async getUserList(input: GetUserListInput) {
    const aggregation = this.userSchema.aggregate([
      {
        $match: {
          ...(input.status && { status: input.status }),
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          foreignField: '_id',
          localField: 'directManagerId',
          as: 'directManager',
        },
      },
      {
        $unwind: {
          path: '$directManager',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.titles,
          localField: 'title',
          foreignField: '_id',
          as: 'title',
        },
      },
      {
        $unwind: {
          path: '$title',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.teams,
          localField: 'team',
          foreignField: '_id',
          as: 'team',
        },
      },
      {
        $unwind: {
          path: '$team',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.roles,
          localField: 'role',
          foreignField: '_id',
          as: 'role',
        },
      },
      {
        $unwind: {
          path: '$role',
          preserveNullAndEmptyArrays: true,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return await this.userSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  async loadUser() {
    const file = fs.createWriteStream(`users.xlsx`);
    const response = await firstValueFrom(
      this.httpService.get(process.env.USER_XCEL_STORE, {
        responseType: 'stream',
      }),
    ).catch((error) => {
      this.logger.error(error.message);
      throw new BaseHttpException('EN', 613);
    });
    response.data.pipe(file);
    await new Promise((fulfill) => file.on('finish', fulfill));
    const parsedSheet = xlsx.parse('users.xlsx');
    const users = parsedSheet[0].data.filter((array) => array.length);
    const columns = users.shift();
    for await (const user of users) {
      const userObject = {
        password: await hashPass('amazingWorkSpace'),
        isAdmin: true,
      };
      columns.forEach((column, index) => {
        // skipping those columns from the excel sheet , to not pollute db data
        if (['birthDate', 'ID', 'directManagerId'].includes(`${column}`))
          return;
        else userObject[`${column}`] = user[index];
      });
      await this.userSchema.findOneAndUpdate(
        { email: userObject['email'] },
        { ...userObject },
        { upsert: true },
      );
    }
    return users;
  }

  async getLevelUsers(level: ObjectId) {
    return await this.userSchema.find({ level }).count();
  }

  getUserByEmail(email) {
    return this.userSchema
      .findOne({ email }, {}, { lean: true })
      .populate('department');
  }

  getUserSubordinates(_id: ObjectId) {
    return this.userSchema.find({ directManagerId: _id });
  }

  updateAndGetUser(email: string, microsoftToken: string) {
    return this.userSchema.findOneAndUpdate(
      { email: email.toLowerCase() },
      { microsoftToken },
      { new: true, populate: 'department' },
    );
  }
}
