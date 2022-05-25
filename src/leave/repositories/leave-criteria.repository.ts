import { Injectable } from '@nestjs/common';
import {
  LeaveCriteria,
  LeaveCriteriaDocument,
} from '../schema/leave-criteria.schema';
import { BaseRepository } from '../../shared/generics/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel } from 'mongoose';
import { CreateLeaveCriteriaInput } from '../inputs/create-leave-criteria.input';
import { User } from '../../user/schema/user.schema';
import { UpdateLeaveCriteriaInput } from '../inputs/update-leave-criteria.input';
import { Pagination } from '../../shared/utils/pagination.input';
import { LookupSchemasEnum } from '../../app.const';

@Injectable()
export class LeaveCriteriaRepository extends BaseRepository<LeaveCriteria> {
  constructor(
    @InjectModel(LeaveCriteria.name)
    private leaveCriteriaSchema: AggregatePaginateModel<LeaveCriteriaDocument>,
  ) {
    super(leaveCriteriaSchema);
  }

  createLeaveCriteria(input: CreateLeaveCriteriaInput) {
    return this.leaveCriteriaSchema.create(input);
  }

  getLeaveCriteriaList(input: Pagination) {
    const aggregation = this.leaveCriteriaSchema.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: LookupSchemasEnum.leaveTypes,
          as: 'leaveType',
          foreignField: '_id',
          localField: 'leaveType',
        },
      },
      {
        $unwind: {
          path: '$leaveType',
          preserveNullAndEmptyArrays: true,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return this.leaveCriteriaSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  updateLeaveCriteria(input: UpdateLeaveCriteriaInput) {
    return this.leaveCriteriaSchema.findOneAndUpdate(
      { _id: input._id },
      input,
      { new: true },
    );
  }

  getLeaveBalance(currentUser: User) {
    return this.leaveCriteriaSchema
      .find({
        $and: [
          {
            $or: [
              {
                departments: { $in: [currentUser.department] },
              },
              { departments: [] },
            ],
          },
          {
            $or: [
              {
                countries: { $in: [currentUser.country] },
              },
              { countries: [] },
            ],
          },
          {
            $or: [
              {
                employmentTypes: { $in: [currentUser.employmentType] },
              },
              { employmentTypes: [] },
            ],
          },
          {
            gender: currentUser.gender,
          },
        ],
      })
      .populate('leaveType');
  }
}
