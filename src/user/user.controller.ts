import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AddUserInput } from './inputs/add-user.input';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags('user')
  @Post('register')
  async addUser(@Body() input: AddUserInput) {
    return await this.userService.addUser(input);
  }
}
