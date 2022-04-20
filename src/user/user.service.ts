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
import { HidePostInput } from './inputs/hide-post.input';
import { UpdateUserByIdInput } from './inputs/update-user-by-id.input';
import { GetUserByBirthDate } from './inputs/get-user-by-birthdate.input';
import { DeleteUserInput } from './inputs/delete-user-by-id.input';
import { Response } from 'express';
import { ConfidentialApplication } from '../shared/providers/confidential-client-app';
import { AcquireMicrosoftTokenInput } from './inputs/acquire-microsoft-token.input';
import { STATUS } from './user.enum';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationResult } from '@azure/msal-node';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
    private confidentialApplication: ConfidentialApplication,
    private jwtService: JwtService,
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

  async microsoftLogin(res: Response) {
    const redirectUrl = await this.confidentialApplication.getAuthCodeUrl({
      scopes: process.env.SCOPES.split(','),
      redirectUri: process.env.LOGIN_REDIRECT_URI,
      correlationId: this.request.id,
    });
    res.redirect(redirectUrl);
  }

  async acquireMicrosoftToken(input: AcquireMicrosoftTokenInput) {
    let token: AuthenticationResult | null;
    try {
      token = await this.confidentialApplication.acquireTokenByCode({
        code: input.code,
        scopes: process.env.SCOPES.split(','),
        redirectUri: process.env.LOGIN_REDIRECT_URI,
      });
    } catch (error) {
      throw new BaseHttpException(this.request.lang, 618, error);
    }
    const user = await this.userRepo.getUserByEmail(
      token.account.username.toLowerCase(),
    );
    if (!user) {
      await this.userRepo.create({
        email: token.account.username,
        fullName: token.account.name,
        status: STATUS.ACTIVE,
        microsoftToken: token.accessToken,
      });
      const createdUser = await this.userRepo.getUserByEmail(
        token.account.username.toLowerCase(),
      );
      createdUser.token = this.jwtService.sign({ _id: user._id });
      return createdUser;
    } else {
      await this.userRepo.updateOne(
        { email: token.account.username },
        { microsoftToken: token.accessToken },
      );
      user.token = this.jwtService.sign({ _id: user._id });
      return user;
    }
  }
}
