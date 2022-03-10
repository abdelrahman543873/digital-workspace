import { Injectable } from '@nestjs/common';
import { Level, LevelDocument } from './schema/level.schema';
import { AggregatePaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { CreateLevelInput } from './inputs/create-level.input';

@Injectable()
export class LevelRepository extends BaseRepository<Level> {
  constructor(
    @InjectModel(Level.name)
    private levelSchema: AggregatePaginateModel<LevelDocument>,
  ) {
    super(levelSchema);
  }

  async createLevel(input: CreateLevelInput) {
    return await this.levelSchema.create(input);
  }
}
