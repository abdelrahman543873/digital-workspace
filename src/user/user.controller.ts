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
} from '@nestjs/common';
import { AddUserInput } from './inputs/add-user.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddFavWidgetInput } from './inputs/add-fav-widget.input';
import { ManageFollowUserInput } from './inputs/manage-follow-user.input';
import { SearchUserInput } from './inputs/search-user.input';
import { Param } from '@nestjs/common';
import { GetUserByIdInput } from './inputs/get-user-by-id.input';
import { User } from './schema/user.schema';

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
  @UseGuards(AuthGuard)
  @Put('favWidget')
  async addFavWidget(@Body() input: AddFavWidgetInput) {
    return await this.userService.addFavWidget(input);
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
}
