import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AddUserInput } from './inputs/add-user.input';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}
  async addUser(input: AddUserInput) {
    return await this.userRepo.addUser(input);
  }
}
