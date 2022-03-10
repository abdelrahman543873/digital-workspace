import { Injectable } from '@nestjs/common';
import { Level, LevelDocument } from './schema/level.schema';
import { AggregatePaginateModel, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { CreateLevelInput } from './inputs/create-level.input';
import { DeleteLevelInput } from './inputs/delete-level.input';

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

  async deleteLevel(input: DeleteLevelInput) {
    return await this.levelSchema.deleteOne({ name: input.name });
  }

  async getLevelByName(name: string) {
    return await this.levelSchema.findOne({ name });
  }
}
