import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { LeaveReason, LeaveReasonDocument } from './schema/reason.schema';
import { AggregatePaginateModel } from 'mongoose';

@Injectable()
export class LeaveReasonRepository extends BaseRepository<LeaveReason> {
  constructor(
    @InjectModel(LeaveReason.name)
    private leaveReasonSchema: AggregatePaginateModel<LeaveReasonDocument>,
  ) {
    super(leaveReasonSchema);
  }
}
