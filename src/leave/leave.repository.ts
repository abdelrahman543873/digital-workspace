import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { Leave, LeaveDocument } from './schema/leave.schema';
import { AggregatePaginateModel, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLeaveInput } from './inputs/create-leave.input';
import { UpdateLeaveInput } from './inputs/update-leave.input';
import { Pagination } from '../shared/utils/pagination.input';
import { ManageLeaveInput } from './inputs/manage-leave.input';

@Injectable()
export class LeaveRepository extends BaseRepository<Leave> {
  constructor(
    @InjectModel(Leave.name)
    private leaveSchema: AggregatePaginateModel<LeaveDocument>,
  ) {
    super(leaveSchema);
  }

  createLeave(
    employee: ObjectId,
    input: CreateLeaveInput,
    attachments: Array<Express.Multer.File>,
  ) {
    return this.leaveSchema.create({
      ...input,
      employee,
      ...(attachments && {
        attachments: attachments.map((attachment) => {
          return `${process.env.HOST}${attachment.filename}`;
        }),
      }),
    });
  }

  updateLeave(
    input: UpdateLeaveInput,
    attachments: Array<Express.Multer.File>,
  ) {
    return this.leaveSchema.findOneAndUpdate(
      { _id: input.id },
      {
        ...input,
        ...(attachments && {
          attachments: attachments.map((attachment) => {
            return `${process.env.HOST}${attachment.filename}`;
          }),
        }),
      },
      { new: true },
    );
  }

  getLeavesList(input: Pagination, employee: ObjectId) {
    const aggregation = this.leaveSchema.aggregate([
      {
        $match: {
          employee,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return this.leaveSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  manageLeave(input: ManageLeaveInput) {
    return this.leaveSchema.findOneAndUpdate(
      { _id: input.id },
      {
        status: input.status,
      },
      { new: true },
    );
  }
}
