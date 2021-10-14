import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AddUserInput } from './inputs/add-user.input';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async addUser(@Body() input: AddUserInput) {
    return await this.userService.addUser(input);
  }
}
