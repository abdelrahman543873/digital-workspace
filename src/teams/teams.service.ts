import { Injectable } from '@nestjs/common';
import { TeamsRepository } from './teams.repository';
import { LogUserInput } from './log-user.input';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) {}
  async logUser(input: LogUserInput) {
    return await this.teamsRepository.logUser(input);
  }
}
