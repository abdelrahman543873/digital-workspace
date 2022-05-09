import { Injectable } from '@nestjs/common';
import { Level, LevelDocument } from './schema/level.schema';
import {
  AggregatePaginateModel,
  ObjectId,
  QueryWithHelpers,
  Types,
} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { CreateLevelInput } from './inputs/create-level.input';
import { DeleteLevelInput } from './inputs/delete-level.input';
import { UpdateLevelInput } from './inputs/update-level.input';
import { Pagination } from '../shared/utils/pagination.input';
import { LookupSchemasEnum } from '../app.const';

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

  async getLevels(input: Pagination) {
    const aggregation = this.levelSchema.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          as: 'levelMembers',
          let: { levelId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$levelId', '$level'],
                },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          members: { $size: '$levelMembers' },
        },
      },
      {
        $project: {
          levelMembers: 0,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return await this.levelSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  deleteLevel(input: DeleteLevelInput): QueryWithHelpers<any, any> {
    return this.levelSchema.deleteOne({ name: input.name });
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
