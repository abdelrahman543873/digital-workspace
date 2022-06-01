import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId, QueryWithHelpers } from 'mongoose';
import { BaseRepository } from '../../shared/generics/repository.abstract';
import { LeaveUser, LeaveUserDocument } from '../schema/leave-user.schema';
import { AddUserLeaveInput } from '../inputs/add-user-leave.input';

@Injectable()
export class LeaveUserRepository extends BaseRepository<LeaveUser> {
  constructor(
    @InjectModel(LeaveUser.name)
    private leaveUserSchema: AggregatePaginateModel<LeaveUserDocument>,
  ) {
    super(leaveUserSchema);
  }

  addUserLeave(input: AddUserLeaveInput) {
    return this.leaveUserSchema.create(input);
  }

  removeLatestUserLeave({
    user,
    leaveType,
  }: {
    user: ObjectId;
    leaveType: ObjectId;
  }) {
    return this.leaveUserSchema.findOneAndDelete(
      { user, leaveType },
      { sort: { createdAt: -1 } },
    );
  }

  async numberOfAcquiredLeaveDays({
    user,
    leaveType,
  }: {
    user: any;
    leaveType: ObjectId;
  }) {
    //try to refactor this to return only one record in aggregation
    const aggregationResult = await this.leaveUserSchema.aggregate([
      {
        $match: {
          user,
          leaveType,
        },
      },
      {
        $group: {
          _id: null,
          totalAcquiredDays: { $sum: '$numberOfDays' },
        },
      },
    ]);
    return aggregationResult[0] ? aggregationResult[0].totalAcquiredDays : 0;
  }
}
