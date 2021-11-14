import { Pagination } from './../shared/utils/pagination.input';
import { LookupSchemasEnum } from './../app.const';
import { hashPass } from './../shared/utils/bcryptHelper';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, Model, ObjectId, Types } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddUserInput } from './inputs/add-user.input';
import { hashPassSync } from '../shared/utils/bcryptHelper';
import { buildUserParams } from './user.seed';
import { TestUser, TestUserDocument } from './schema/test-user.schema';
import { AddFavWidgetInput } from './inputs/add-fav-widget.input';
import { ManageFollowUserInput } from './inputs/manage-follow-user.input';
import { SearchUserInput } from './inputs/search-user.input';
import { GetUserByIdInput } from './inputs/get-user-by-id.input';
import { UpdateUserInput } from './inputs/update-user.input';
@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User.name)
    private userSchema: AggregatePaginateModel<UserDocument>,
    @InjectModel(TestUser.name) private testUserSchema: Model<TestUserDocument>,
  ) {
    super(userSchema);
  }

  async addUser(input: AddUserInput) {
    return (
      await this.userSchema.create({
        ...input,
        password: await hashPass(input.password),
      })
    ).toJSON();
  }

  async getTestUsers() {
    return await this.testUserSchema.find();
  }

  async seedUsers() {
    const verifyExistingTestUsers = await this.testUserSchema.findOne();
    if (verifyExistingTestUsers) return await this.testUserSchema.find();
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      const params = buildUserParams();
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
    return await this.userSchema.find({
      $or: [
        { email: { $regex: input.keyword, $options: 'i' } },
        { username: { $regex: input.keyword, $options: 'i' } },
      ],
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
                      $in: [input.userId, '$following'],
                    },
                    {
                      $setDifference: ['$following', [input.userId]],
                    },
                    {
                      $concatArrays: ['$following', [input.userId]],
                    },
                  ],
                },
                {},
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
                {
                  // if the _id doesn't match the followed person _id do nothing
                },
              ],
            },
          },
        },
      ],
    );
    return await this.userSchema.findOne({ _id: userId });
  }

  async getUserById(input: GetUserByIdInput): Promise<User> {
    return await this.userSchema.findOne({ _id: input.id });
  }

  async recommendUsers(userId: ObjectId, pagination: Pagination) {
    const aggregation = this.userSchema.aggregate([
      {
        $match: {
          _id: userId,
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
                        { $ifNull: ['$commonToBoth', false] }, // if
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
    ]);
    return await this.userSchema.aggregatePaginate(aggregation, {
      sort: { createdAt: 1 },
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
        directManagerId: input.directManagerId as ObjectId,
        ...(newPassword && { password: hashPassSync(newPassword) }),
        ...(files?.coverPic && {
          coverPic: `${process.env.HOST}pictures/${files.coverPic[0].filename}`,
        }),
        ...(files?.profilePic && {
          profilePic: `${process.env.HOST}pictures/${files.profilePic[0].filename}`,
        }),
      },
      { new: true },
    );
  }

  async getStats(userId: ObjectId) {
    return (
      await this.userSchema.aggregate([
        {
          $match: {
            $expr: { $eq: [userId, '$_id'] },
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
                    $eq: [userId, '$userId'],
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
                    $in: [userId, '$members'],
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
                    $in: [userId, '$likes'],
                  },
                },
              },
            ],
            as: 'likes',
          },
        },
        {
          $addFields: { likes: { $size: '$likes' } },
        },
        {
          $project: {
            likes: 1,
            groups: 1,
            posts: 1,
            followers: 1,
            _id: 0,
          },
        },
      ])
    )[0];
  }
}
