import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { LeaveReasonDocument, LeaveType } from './schema/leave-type.schema';
import { AggregatePaginateModel } from 'mongoose';

@Injectable()
export class LeaveTypeRepository extends BaseRepository<LeaveType> {
  constructor(
    @InjectModel(LeaveType.name)
    private leaveTypeSchema: AggregatePaginateModel<LeaveReasonDocument>,
  ) {
    super(leaveTypeSchema);
  }
}
