import { AuthGuard } from './../shared/guards/auth.guard';
import { Body, Controller, Post, Query, UseGuards, Get } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamInput } from './inputs/create-team.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddTeamMemberInput } from './inputs/manage-team-member.input';
import { MyTeamsInput } from './inputs/get-my-teams.input';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @ApiBearerAuth()
  @ApiTags('team')
  @UseGuards(AuthGuard)
  @Post('create')
  async createTeam(@Body() input: CreateTeamInput) {
    return await this.teamService.createTeam(input);
  }

  @ApiBearerAuth()
  @ApiTags('team')
  @UseGuards(AuthGuard)
  @Post('manageTeamMember')
  async ManageTeamMember(@Body() input: AddTeamMemberInput) {
    return await this.teamService.ManageTeamMember(input);
  }

  @ApiBearerAuth()
  @ApiTags('team')
  @UseGuards(AuthGuard)
  @Get('myTeams')
  async getMyTeams(@Query() input: MyTeamsInput) {
    return await this.teamService.getMyTeams(input);
  }
}