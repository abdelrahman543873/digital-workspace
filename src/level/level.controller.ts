import { ActiveUserGuard } from './../shared/guards/active-user.guard';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Delete,
  Put,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LevelService } from './level.service';
import { CreateLevelInput } from './inputs/create-level.input';
import { DeleteLevelInput } from './inputs/delete-level.input';
import { UpdateLevelInput } from './inputs/update-level.input';
import { Pagination } from '../shared/utils/pagination.input';
import { Query } from '@nestjs/common';
@UseGuards(ActiveUserGuard)
@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @ApiTags('level')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async createLevel(@Body() input: CreateLevelInput) {
    return await this.levelService.createLevel(input);
  }

  @ApiTags('level')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async getLevels(@Query() input: Pagination) {
    return await this.levelService.getLevels(input);
  }

  @ApiTags('level')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  async deleteLevel(@Body() input: DeleteLevelInput) {
    return await this.levelService.deleteLevel(input);
  }

  @ApiTags('level')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put()
  async updateLevel(@Body() input: UpdateLevelInput) {
    return await this.levelService.updateLevel(input);
  }
}
