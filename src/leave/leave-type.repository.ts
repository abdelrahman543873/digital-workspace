import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { LeaveReasonDocument, LeaveType } from './schema/leave-type.schema';
import { AggregatePaginateModel } from 'mongoose';
import { CreateLeaveTypeInput } from './inputs/create-leave-type.input';
import { Pagination } from '../shared/utils/pagination.input';
import { DeleteLeaveTypeInput } from './inputs/delete-levae-type.input';

@Injectable()
export class LeaveTypeRepository extends BaseRepository<LeaveType> {
  constructor(
    @InjectModel(LeaveType.name)
    private leaveTypeSchema: AggregatePaginateModel<LeaveReasonDocument>,
  ) {
    super(leaveTypeSchema);
  }

  createLeaveType(input: CreateLeaveTypeInput) {
    return this.leaveTypeSchema.create(input);
  }

  deleteLeaveType(input: DeleteLeaveTypeInput) {
    console.log(input.id);
    return this.leaveTypeSchema.findOneAndDelete({ _id: input.id });
  }

  getLeaveTypes(input: Pagination) {
    const aggregation = this.leaveTypeSchema.aggregate([
      {
        $match: {},
      },
      { $sort: { createdAt: -1 } },
    ]);
    return this.leaveTypeSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }
}
