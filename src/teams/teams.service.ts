import { BaseHttpException } from './../shared/exceptions/base-http-exception';
import { Inject, Injectable } from '@nestjs/common';
import { TeamsRepository } from './teams.repository';
import { RegisterUserTokenInput } from './inputs/register-user-token.input';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from '../shared/request.interface';
import { UserRepository } from '../user/user.repository';
import { EventsInput } from './inputs/events.input';

@Injectable()
export class TeamsService {
  constructor(
    private readonly teamsRepository: TeamsRepository,
    private userRepository: UserRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async events(input: EventsInput) {
    const user = await this.userRepository.findOne({
      _id: this.request.currentUser._id,
    });
    if (!user.microsoftToken) throw new BaseHttpException('EN', 609);
    return await this.teamsRepository.events(user, input);
  }

  async registerUserMicrosoft(input: RegisterUserTokenInput) {
    return await this.teamsRepository.registerUserMicrosoft(
      this.request.currentUser._id,
      input,
    );
  }
}
