import { FileCloudUploadInterceptor } from './../shared/interceptors/file-cloud-upload.interceptor';
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
  Delete,
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
import { AddUserSwagger } from './swagger/add-user.swagger';
import { UpdateUserByIdInput } from './inputs/update-user-by-id.input';
import { UpdateUserByIdSwagger } from './swagger/update-user-by-id.swagger';
import { GetUserByBirthDate } from './inputs/get-user-by-birthdate.input';
import { DeleteUserInput } from './inputs/delete-user-by-id.input';
import { ActiveUserGuard } from '../shared/guards/active-user.guard';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags('user')
  @ApiConsumes('multipart/form-data')
  @ApiBody(AddUserSwagger)
  @UseInterceptors(FileCloudUploadInterceptor)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePic', maxCount: 1 },
      { name: 'coverPic', maxCount: 1 },
    ]),
  )
  @Post('register')
  async addUser(
    @Body() input: AddUserInput,
    @UploadedFiles()
    files: {
      profilePic?: Express.Multer.File[];
      coverPic?: Express.Multer.File[];
    },
  ) {
    return await this.userService.addUser(input, files);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @ApiConsumes('multipart/form-data')
  @ApiBody(UpdateUserSwagger)
  @UseGuards(AuthGuard, ActiveUserGuard)
  @UseInterceptors(FileCloudUploadInterceptor)
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
  @ApiConsumes('multipart/form-data')
  @ApiBody(UpdateUserByIdSwagger)
  @UseGuards(AuthGuard, ActiveUserGuard)
  @UseInterceptors(FileCloudUploadInterceptor)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePic', maxCount: 1 },
      { name: 'coverPic', maxCount: 1 },
    ]),
  )
  @UsePipes(new JoiValidationPipe(UpdateUserJoi, true))
  @Put('updateById')
  async updateUserById(
    @Body() input: UpdateUserByIdInput,
    @UploadedFiles()
    files: {
      profilePic?: Express.Multer.File[];
      coverPic?: Express.Multer.File[];
    },
  ) {
    return await this.userService.updateUserById(input, files);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard, ActiveUserGuard)
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
  @UseGuards(AuthGuard, ActiveUserGuard)
  @Get('hierarchy')
  async getHierarchy(@Query() input: GetHierarchyInput) {
    return await this.userService.getHierarchy(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard, ActiveUserGuard)
  @Get('userById/:id')
  async getUserById(@Param() input: GetUserByIdInput): Promise<User> {
    return await this.userService.getUserById(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard, ActiveUserGuard)
  @Get('list')
  async getUserList(@Query() input: Pagination) {
    return await this.userService.getUserList(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard, ActiveUserGuard)
  @Get('search')
  async searchUser(@Query() input: SearchUserInput) {
    return await this.userService.searchUser(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard, ActiveUserGuard)
  @Get('recommendations')
  async recommendUsers(@Query() pagination: Pagination) {
    return await this.userService.recommendUsers(pagination);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard, ActiveUserGuard)
  @Get('mostFollowed')
  async getMostFollowedUsers(@Query() pagination: Pagination) {
    return await this.userService.getMostFollowed(pagination);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard, ActiveUserGuard)
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
  @UseGuards(AuthGuard, ActiveUserGuard)
  @Put('manageFollow')
  async manageFollow(@Body() input: ManageFollowUserInput) {
    return await this.userService.manageFollow(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard, ActiveUserGuard)
  @Get('stats')
  async getStats(@Query() input: GetStatsInput) {
    return await this.userService.getStats(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard, ActiveUserGuard)
  @Get('byBirthday')
  async getUserByBirthday(@Query() input: GetUserByBirthDate) {
    return await this.userService.getUserByBirthDate(input);
  }

  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(AuthGuard, ActiveUserGuard)
  @Delete('delete')
  async deleteUserById(@Body() input: DeleteUserInput) {
    return await this.userService.deleteUserById(input);
  }

  @ApiTags('user')
  @Post('load')
  async loadUser() {
    return await this.userService.loadUser();
  }
}
