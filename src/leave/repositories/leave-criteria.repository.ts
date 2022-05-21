import { Injectable } from '@nestjs/common';
import {
  LeaveCriteria,
  LeaveCriteriaDocument,
} from '../schema/leave-criteria.schema';
import { BaseRepository } from '../../shared/generics/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel } from 'mongoose';
import { CreateLeaveCriteriaInput } from '../inputs/create-leave-criteria.input';

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
}
