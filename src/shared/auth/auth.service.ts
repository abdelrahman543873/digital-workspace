import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HelperService } from '../helper/helper.service';
import { User } from '../../user/schema/user.schema';
import { LoginInput } from './inputs/login.input';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from '../request.interface';
import { bcryptCheckPass } from '../utils/bcryptHelper';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly helperService: HelperService,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async login(input: LoginInput): Promise<User> {
    const user = await this.helperService.getExistingUser({
      email: input.email.toLowerCase(),
    });
    if (!user) throw new BaseHttpException(this.request.lang, 602);
    const userPassword =
      await this.helperService.getExistingUserEncryptedPassword({
        email: input.email,
      });
    const passwordValidation = await bcryptCheckPass(
      input.password,
      userPassword.password,
    );
    if (!passwordValidation)
      throw new BaseHttpException(this.request.lang, 603);
    user.token = this.jwtService.sign({ _id: user._id });
    return user;
  }
}
