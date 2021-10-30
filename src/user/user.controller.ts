import { AuthGuard } from './../shared/guards/auth.guard';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AddUserInput } from './inputs/add-user.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddFavWidgetInput } from './inputs/add-fav-widget.input';

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

  @ApiTags('user')
  @Get('testUsers')
  async getTestUsers() {
    return await this.userService.getTestUsers();
  }
}
