import { Injectable } from '@nestjs/common';
import { Level, LevelDocument } from './schema/level.schema';
import { AggregatePaginateModel, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { CreateLevelInput } from './inputs/create-level.input';
import { DeleteLevelInput } from './inputs/delete-level.input';
import { UpdateLevelInput } from './inputs/update-level.input';

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

  async updateLevel(_id: string, input: UpdateLevelInput) {
    return await this.levelSchema.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      input,
      {
        new: true,
      },
    );
  }
}
