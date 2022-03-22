import { Inject, Injectable } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { CreateTeamInput } from './inputs/create-team.input';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { AddTeamMemberInput } from './inputs/manage-team-member.input';
import { MyTeamsInput } from './inputs/get-my-teams.input';

@Injectable()
export class TeamService {
  constructor(
    private teamRepository: TeamRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async createTeam(input: CreateTeamInput) {
    return await this.teamRepository.createTeam(
      this.request.currentUser._id,
      input,
    );
  }

  async ManageTeamMember(input: AddTeamMemberInput) {
    return await this.teamRepository.manageTeamMember(
      this.request.currentUser._id,
      input,
    );
  }

  async getMyTeams(input: MyTeamsInput) {
    return await this.teamRepository.getMyTeams(
      this.request.currentUser._id,
      input,
    );
  }
}
