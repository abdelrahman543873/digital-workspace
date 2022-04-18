import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { Leave, LeaveDocument } from './schema/leave.schema';
import { AggregatePaginateModel, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLeaveInput } from './inputs/create-leave.input';

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
}
