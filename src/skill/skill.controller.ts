import { ActiveUserGuard } from './../shared/guards/active-user.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CreateSkillInput } from './inputs/create-skill.input';
import { Pagination } from '../shared/utils/pagination.input';
import { DeleteSkillInput } from './inputs/delete-skill.input';
import { UpdateSkillInput } from './inputs/update-skill.input';

@UseGuards(ActiveUserGuard)
@Controller('skill')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @ApiBearerAuth()
  @ApiTags('skill')
  @UseGuards(AuthGuard)
  @Post()
  async createSkill(@Body() input: CreateSkillInput) {
    return await this.skillService.createSkill(input);
  }

  @ApiBearerAuth()
  @ApiTags('skill')
  @UseGuards(AuthGuard)
  @Put()
  async updateSkill(@Body() input: UpdateSkillInput) {
    return await this.skillService.updateSkill(input);
  }

  @ApiBearerAuth()
  @ApiTags('skill')
  @UseGuards(AuthGuard)
  @Delete()
  async deleteSkill(@Body() input: DeleteSkillInput) {
    return await this.skillService.deleteSkill(input);
  }

  @ApiBearerAuth()
  @ApiTags('skill')
  @UseGuards(AuthGuard)
  @Get('list')
  async getSkillsList(@Query() input: Pagination) {
    return await this.skillService.getSkillList(input);
  }
}
