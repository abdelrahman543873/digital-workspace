import { hashPass } from './../shared/utils/bcryptHelper';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddUserInput } from './inputs/add-user.input';
import { hashPassSync } from '../shared/utils/bcryptHelper';
import { buildUserParams } from './user.seed';
import { TestUser, TestUserDocument } from './schema/test-user.schema';
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

  async seedUsers() {
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      const params = buildUserParams();
      users.push(params);
    }
    await this.testUserSchema.insertMany(users.map((user) => {
      return { email: user.email, password: user.password }
    }));
    return await this.userSchema.insertMany(users.map((user) => {
      return { ...user, password: hashPassSync(user.password) }
    }));
  }
}
