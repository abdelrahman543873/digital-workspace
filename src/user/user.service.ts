import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AddUserInput } from './inputs/add-user.input';
import { generateAuthToken } from '../shared/utils/token-utils';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) { }
  async addUser(input: AddUserInput) {
    const user = await this.userRepo.addUser(input);
    user.token = generateAuthToken(user._id);
    return user;
  }
  async getTestUsers() {
    return await this.userRepo.getTestUsers();
  }
}
