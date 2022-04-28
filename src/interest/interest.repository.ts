import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, Types } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { LookupSchemasEnum } from '../app.const';
import { Pagination } from '../shared/utils/pagination.input';
import { Interest, InterestDocument } from './schema/interest.schema';
import { CreateInterestInput } from './inputs/create-interest.input';
import { DeleteInterestInput } from './inputs/delete-interest.input';
import { UpdateInterestInput } from './inputs/update-interest.input';

@Injectable()
export class InterestRepository extends BaseRepository<Interest> {
  constructor(
    @InjectModel(Interest.name)
    private interestSchema: AggregatePaginateModel<InterestDocument>,
  ) {
    super(interestSchema);
  }

  findInterest(input: { name?: string; id?: string }) {
    return this.interestSchema.findOne({
      ...input,
      ...(input.id && { _id: new Types.ObjectId(input.id) }),
    });
  }

  createInterest(input: CreateInterestInput) {
    return this.interestSchema.create(input);
  }

  deleteInterest(input: DeleteInterestInput) {
    return this.interestSchema.findOneAndDelete({
      _id: new Types.ObjectId(input.id),
    });
  }

  getInterestsList(input: Pagination) {
    const aggregation = this.interestSchema.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          as: 'members',
          let: { interest: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$$interest', '$interests'],
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
    return this.interestSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  updateInterest(input: UpdateInterestInput) {
    return this.interestSchema.findOneAndUpdate(
      {
        _id: new Types.ObjectId(input.id),
      },
      input,
      { new: true },
    );
  }
}
