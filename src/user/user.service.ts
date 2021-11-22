import { Pagination } from './../shared/utils/pagination.input';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AddUserInput } from './inputs/add-user.input';
import { generateAuthToken } from '../shared/utils/token-utils';
import { AddFavWidgetInput } from './inputs/add-fav-widget.input';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { ManageFollowUserInput } from './inputs/manage-follow-user.input';
import { SearchUserInput } from './inputs/search-user.input';
import { GetUserByIdInput } from './inputs/get-user-by-id.input';
import { User } from './schema/user.schema';
import { UpdateUserInput } from './inputs/update-user.input';
import { GetStatsInput } from './inputs/get-stats.input';
import { BaseHttpException } from '../shared/exceptions/base-http-exception';
import { GetHierarchyInput } from './inputs/get-hierarchy.input';

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

  async updateUser(
    input: UpdateUserInput,
    files: {
      profilePic?: Express.Multer.File[];
      coverPic?: Express.Multer.File[];
    },
  ) {
    if (
      input.directManagerId &&
      !(await this.userRepo.checkUserExists(input.directManagerId))
    )
      throw new BaseHttpException(this.request.lang, 602);
    if (input?.directManagerId === this.request.currentUser._id.toString())
      throw new BaseHttpException(this.request.lang, 607);
    return await this.userRepo.updateUser(
      this.request.currentUser._id,
      input,
      files,
    );
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

  getMyProfile() {
    return this.request.currentUser;
  }

  async searchUser(input: SearchUserInput) {
    return await this.userRepo.searchUser(input);
  }

  async getHierarchy(input: GetHierarchyInput) {
    return await this.userRepo.getHierarchy(this.request.currentUser, input);
  }

  async manageFollow(input: ManageFollowUserInput) {
    if (!(await this.userRepo.checkUserExists(input.userId)))
      throw new BaseHttpException(this.request.lang, 602);
    if (input.userId === this.request.currentUser._id.toString()) {
      throw new BaseHttpException(this.request.lang, 606);
    }
    return await this.userRepo.manageFollow(
      this.request.currentUser._id,
      input,
    );
  }

  async getUserById(input: GetUserByIdInput): Promise<User> {
    return await this.userRepo.getUserById(input);
  }

  async recommendUsers(pagination: Pagination) {
    return await this.userRepo.recommendUsers(
      this.request.currentUser._id,
      pagination,
    );
  }

  async getStats(input: GetStatsInput) {
    return await this.userRepo.getStats(this.request.currentUser._id, input);
  }

  async getMostFollowed(pagination: Pagination) {
    return await this.userRepo.getMostFollowed(pagination);
  }
}
