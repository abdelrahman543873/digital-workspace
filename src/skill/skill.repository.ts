import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, Types } from 'mongoose';
import { Skill, SkillDocument } from './schema/skill.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { LookupSchemasEnum } from '../app.const';
import { Pagination } from '../shared/utils/pagination.input';
import { CreateSkillInput } from './inputs/create-skill.input';
import { DeleteSkillInput } from './inputs/delete-skill.input';
import { UpdateSkillInput } from './inputs/update-skill.input';

@Injectable()
export class SkillRepository extends BaseRepository<Skill> {
  constructor(
    @InjectModel(Skill.name)
    private skillSchema: AggregatePaginateModel<SkillDocument>,
  ) {
    super(skillSchema);
  }

  findSkill(input: { name?: string; id?: string }) {
    return this.skillSchema.findOne({
      ...input,
      ...(input.id && { _id: new Types.ObjectId(input.id) }),
    });
  }

  createSkill(input: CreateSkillInput) {
    return this.skillSchema.create(input);
  }

  deleteSkill(input: DeleteSkillInput) {
    return this.skillSchema.findOneAndDelete({
      _id: new Types.ObjectId(input.id),
    });
  }

  getSkillsList(input: Pagination) {
    const aggregation = this.skillSchema.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          as: 'members',
          let: { skill: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$$skill', '$skills'],
                },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          members: { $size: '$members' },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return this.skillSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  updateSkill(input: UpdateSkillInput) {
    return this.skillSchema.findOneAndUpdate(
      {
        _id: new Types.ObjectId(input.id),
      },
      input,
      { new: true },
    );
  }
}
