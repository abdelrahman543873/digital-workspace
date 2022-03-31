import { Injectable } from '@nestjs/common';
import {
  EmploymentType,
  EmploymentTypeDocument,
} from './schema/employment-type.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel } from 'mongoose';
import { CreateEmploymentTypeInput } from './inputs/create-employment-type.input';

@Injectable()
export class EmploymentTypeRepository extends BaseRepository<EmploymentType> {
  constructor(
    @InjectModel(EmploymentType.name)
    private employmentTypeSchema: AggregatePaginateModel<EmploymentTypeDocument>,
  ) {
    super(employmentTypeSchema);
  }

  findEmploymentTypeByName(name: string) {
    return this.employmentTypeSchema.findOne({ name });
  }

  createEmploymentType(input: CreateEmploymentTypeInput) {
    return this.employmentTypeSchema.create(input);
  }
}
