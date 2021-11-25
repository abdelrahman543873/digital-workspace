import { Controller, Get, Redirect, Query } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { LogUserInput } from './log-user.input';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiExcludeEndpoint()
  @Get()
  @Redirect(
    `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/authorize?client_id=${process.env.CLIENT_ID}&response_type=${process.env.RESPONSE_TYPE}&scope=${process.env.SCOPE}`,
  )
  async logMicrosoft() {
    return {
      url: `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/authorize?client_id=${process.env.CLIENT_ID}&response_type=${process.env.RESPONSE_TYPE}&scope=${process.env.SCOPE}`,
    };
  }

  @ApiExcludeEndpoint()
  @Get('events')
  async logUser(@Query() input: LogUserInput) {
    return await this.teamsService.logUser(input);
  }
}
