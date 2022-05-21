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
