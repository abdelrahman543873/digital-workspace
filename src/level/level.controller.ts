import { Body, Controller, Post, UseGuards, Delete, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LevelService } from './level.service';
import { CreateLevelInput } from './inputs/create-level.input';
import { DeleteLevelInput } from './inputs/delete-level.input';
import { UpdateLevelInput } from './inputs/update-level.input';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @ApiTags('level')
  @UseGuards(AuthGuard)
  @Post()
  async createLevel(@Body() input: CreateLevelInput) {
    return await this.levelService.createLevel(input);
  }

  @ApiTags('level')
  @UseGuards(AuthGuard)
  @Delete()
  async deleteLevel(@Body() input: DeleteLevelInput) {
    return await this.levelService.deleteLevel(input);
  }

  @ApiTags('level')
  @UseGuards(AuthGuard)
  @Put()
  async updateLevel(@Body() input: UpdateLevelInput) {
    return await this.levelService.updateLevel(input);
  }
}
