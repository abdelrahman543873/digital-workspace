import { JoiValidationPipe } from './../shared/pipes/joi.pipe';
import { AuthGuard } from './../shared/guards/auth.guard';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
  UsePipes,
} from '@nestjs/common';
import { AddUserInput } from './inputs/add-user.input';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AddFavWidgetInput } from './inputs/add-fav-widget.input';
import { ManageFollowUserInput } from './inputs/manage-follow-user.input';
import { SearchUserInput } from './inputs/search-user.input';
import { Param } from '@nestjs/common';
import { GetUserByIdInput } from './inputs/get-user-by-id.input';
import { User } from './schema/user.schema';
import { Pagination } from '../shared/utils/pagination.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { UpdateUserSwagger } from './swagger/update-user.swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUserJoi } from './joi/update-user.joi';
import { GetStatsInput } from './inputs/get-stats.input';
import { GetHierarchyInput } from './inputs/get-hierarchy.input';
import { HidePostInput } from './inputs/hide-post.input';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags('user')
  @Post('register')
  async addUser(@Body() input: AddUserInput) {
    return await this.userService.addUser(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @ApiConsumes('multipart/form-data')
  @ApiBody(UpdateUserSwagger)
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePic', maxCount: 1 },
      { name: 'coverPic', maxCount: 1 },
    ]),
  )
  @UsePipes(new JoiValidationPipe(UpdateUserJoi, true))
  @Put('update')
  async updateUser(
    @Body() input: UpdateUserInput,
    @UploadedFiles()
    files: {
      profilePic?: Express.Multer.File[];
      coverPic?: Express.Multer.File[];
    },
  ) {
    return await this.userService.updateUser(input, files);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard)
  @Put('favWidget')
  async addFavWidget(@Body() input: AddFavWidgetInput) {
    return await this.userService.addFavWidget(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard)
  @Get('myProfile')
  async getMyProfile() {
    return this.userService.getMyProfile();
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard)
  @Get('hierarchy')
  async getHierarchy(@Query() input: GetHierarchyInput) {
    return await this.userService.getHierarchy(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard)
  @Get('userById/:id')
  async getUserById(@Param() input: GetUserByIdInput): Promise<User> {
    return await this.userService.getUserById(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard)
  @Get('search')
  async searchUser(@Query() input: SearchUserInput) {
    return await this.userService.searchUser(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard)
  @Get('recommendations')
  async recommendUsers(@Query() pagination: Pagination) {
    return await this.userService.recommendUsers(pagination);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard)
  @Get('mostFollowed')
  async getMostFollowedUsers(@Query() pagination: Pagination) {
    return await this.userService.getMostFollowed(pagination);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard)
  @Put('hidePost')
  async hidePost(@Body() input: HidePostInput) {
    return await this.userService.hidePost(input);
  }

  @ApiTags('user')
  @Get('testUsers')
  async getTestUsers() {
    return await this.userService.getTestUsers();
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard)
  @Put('manageFollow')
  async manageFollow(@Body() input: ManageFollowUserInput) {
    return await this.userService.manageFollow(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard)
  @Get('stats')
  async getStats(@Query() input: GetStatsInput) {
    return await this.userService.getStats(input);
  }
}
