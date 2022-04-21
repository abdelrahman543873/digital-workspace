import { AuthGuard } from './../shared/guards/auth.guard';
import {
  Controller,
  Get,
  Redirect,
  Query,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { RegisterUserTokenInput } from './inputs/register-user-token.input';
import { Body } from '@nestjs/common';
import { EventsInput } from './inputs/events.input';
import { ActiveUserGuard } from '../shared/guards/active-user.guard';
@UseGuards(ActiveUserGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('events')
  async events(@Query() input: EventsInput) {
    return await this.teamsService.events(input);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('registerUserMicrosoftToken')
  async registerUserMicrosoft(@Body() input: RegisterUserTokenInput) {
    return await this.teamsService.registerUserMicrosoft(input);
  }
}
