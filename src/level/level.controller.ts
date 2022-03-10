import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LevelService } from './level.service';
import { CreateLevelInput } from './inputs/create-level.input';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @ApiTags('level')
  @UseGuards(AuthGuard)
  @Post()
  async createLevel(@Body() input: CreateLevelInput) {
    return await this.levelService.createLevel(input);
  }
}
