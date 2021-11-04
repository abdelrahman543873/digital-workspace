import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AddUserInput } from './inputs/add-user.input';
import { generateAuthToken } from '../shared/utils/token-utils';
import { AddFavWidgetInput } from './inputs/add-fav-widget.input';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { ManageFollowUserInput } from './inputs/manage-follow-user.input';
import { SearchUserInput } from './inputs/search-user.input';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}
  async addUser(input: AddUserInput) {
    const user = await this.userRepo.addUser(input);
    user.token = generateAuthToken(user._id);
    return user;
  }
  async getTestUsers() {
    return await this.userRepo.getTestUsers();
  }

  async addFavWidget(input: AddFavWidgetInput) {
    return await this.userRepo.addFavWidget(
      this.request.currentUser._id,
      input,
    );
  }

  async searchUser(input: SearchUserInput) {
    return await this.userRepo.searchUser(input);
  }

  async manageFollow(input: ManageFollowUserInput) {
    return await this.userRepo.manageFollow(
      this.request.currentUser._id,
      input,
    );
  }
}
