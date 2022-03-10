import { Injectable } from '@nestjs/common';
import { CreateLevelInput } from './inputs/create-level.input';
import { LevelRepository } from './level.repository';

@Injectable()
export class LevelService {
  constructor(private levelRepository: LevelRepository) {}

  async createLevel(input: CreateLevelInput) {
    return await this.levelRepository.createLevel(input);
  }
}
