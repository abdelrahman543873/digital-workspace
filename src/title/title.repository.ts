import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, Types } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { LookupSchemasEnum } from '../app.const';
import { Pagination } from '../shared/utils/pagination.input';
import { Title, TitleDocument } from './schema/title.schema';
import { CreateTitleInput } from './inputs/create-title.input';
import { DeleteTitleInput } from './inputs/delete-title.input';
import { UpdateTitleInput } from './inputs/update-title.input';

@Injectable()
export class TitleRepository extends BaseRepository<Title> {
  constructor(
    @InjectModel(Title.name)
    private titleSchema: AggregatePaginateModel<TitleDocument>,
  ) {
    super(titleSchema);
  }

  findTitle(input: { name?: string; id?: string }) {
    return this.titleSchema.findOne({
      ...input,
      ...(input.id && { _id: new Types.ObjectId(input.id) }),
    });
  }

  createTitle(input: CreateTitleInput) {
    return this.titleSchema.create({
      ...input,
      department: new Types.ObjectId(input.department),
    });
  }

  deleteTitle(input: DeleteTitleInput) {
    return this.titleSchema.findOneAndDelete({
      _id: new Types.ObjectId(input.id),
    });
  }

  getTitlesList(input: Pagination) {
    const aggregation = this.titleSchema.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: LookupSchemasEnum.departments,
          localField: 'department',
          foreignField: '_id',
          as: 'department',
        },
      },
      { $unwind: '$department' },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          as: 'members',
          let: { title: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$title', '$title'],
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
    return this.titleSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  updateTitle(input: UpdateTitleInput) {
    return this.titleSchema
      .findOneAndUpdate(
        {
          _id: new Types.ObjectId(input.id),
        },
        {
          ...input,
          ...(input.department && {
            department: new Types.ObjectId(input.department),
          }),
        },
        { new: true },
      )
      .populate('department');
  }
}
