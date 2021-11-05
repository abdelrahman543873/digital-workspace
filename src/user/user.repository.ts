import { hashPass } from './../shared/utils/bcryptHelper';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
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
@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
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
      ...(input.email && { email: { $regex: input.email } }),
      ...(input.username && { username: { $regex: input.username } }),
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
}
