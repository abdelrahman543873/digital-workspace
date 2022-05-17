import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../shared/generics/repository.abstract';
import {
  RejectionReason,
  RejectionReasonDocument,
} from '../schema/rejection-reason.schema';
import { AggregatePaginateModel } from 'mongoose';
import { AddRejectionReasonInput } from '../inputs/add-rejection-reason.input';
import { Pagination } from '../../shared/utils/pagination.input';
@Injectable()
export class RejectionReasonRepository extends BaseRepository<RejectionReason> {
  constructor(
    @InjectModel(RejectionReason.name)
    private rejectionReasonSchema: AggregatePaginateModel<RejectionReasonDocument>,
  ) {
    super(rejectionReasonSchema);
  }

  addRejectionReason(input: AddRejectionReasonInput) {
    return this.rejectionReasonSchema.create(input);
  }

  getRejectionReasonsList(input: Pagination) {
    const aggregation = this.rejectionReasonSchema.aggregate([
      {
        $match: {},
      },
      { $sort: { createdAt: -1 } },
    ]);
    return this.rejectionReasonSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }
}
