import { Pagination } from './../shared/utils/pagination.input';
import { Inject, Injectable, Logger } from '@nestjs/common';
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
import { HidePostInput } from './inputs/hide-post.input';
import { UpdateUserByIdInput } from './inputs/update-user-by-id.input';
import { GetUserByBirthDate } from './inputs/get-user-by-birthdate.input';
import { DeleteUserInput } from './inputs/delete-user-by-id.input';
import { LoginInput } from '../shared/auth/inputs/login.input';
import {
  ConfidentialClientApplication,
  Configuration,
  LogLevel,
} from '@azure/msal-node';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
    private logger: Logger,
  ) {}
  async addUser(
    input: AddUserInput,
    files: {
      profilePic?: Express.Multer.File[];
      coverPic?: Express.Multer.File[];
    },
  ) {
    const user = await this.userRepo.addUser(input, files);
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

  async updateUserById(
    input: UpdateUserByIdInput,
    files: {
      profilePic?: Express.Multer.File[];
      coverPic?: Express.Multer.File[];
    },
  ) {
    if (input.userId && !(await this.userRepo.checkUserExists(input.userId)))
      throw new BaseHttpException(this.request.lang, 602);
    if (
      input.directManagerId &&
      !(await this.userRepo.checkUserExists(input.directManagerId))
    )
      throw new BaseHttpException(this.request.lang, 608);
    return await this.userRepo.updateUserById(input, files);
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

  async getUserList(input: Pagination) {
    return await this.userRepo.getUserList(input);
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

  async hidePost(input: HidePostInput) {
    return await this.userRepo.hidePost(this.request.currentUser._id, input);
  }

  async getUserByBirthDate(input: GetUserByBirthDate) {
    return await this.userRepo.getUserByBirthDate(input);
  }

  async deleteUserById(input: DeleteUserInput) {
    return await this.userRepo.deleteUserById(input);
  }

  async loadUser() {
    return await this.userRepo.loadUser();
  }

  async microsoftLogin(input: LoginInput, res: Response) {
    const config: Configuration = {
      auth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      },
      system: {
        loggerOptions: {
          logLevel: LogLevel.Verbose,
          correlationId: this.request.id,
          loggerCallback(level, message) {
            console.log(level, message);
          },
        },
      },
    };
    const microsoftPca = new ConfidentialClientApplication(config);
    const redirectUrl = await microsoftPca.getAuthCodeUrl({
      scopes: ['user.read'],
      redirectUri: process.env.REDIRECT_URI,
    });
    res.redirect(redirectUrl);
  }
}
