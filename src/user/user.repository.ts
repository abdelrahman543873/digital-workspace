import { hashPass } from './../shared/utils/bcryptHelper';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { AddUserInput } from './inputs/add-user.input';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private userSchema: Model<UserDocument>) {
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
}
