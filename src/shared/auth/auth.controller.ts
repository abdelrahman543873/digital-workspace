import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginInput } from './inputs/login.input';
import { User } from '../../user/schema/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('authentication')
  @Post('login')
  async login(@Body() input: LoginInput): Promise<User> {
    return await this.authService.login(input);
  }
}
