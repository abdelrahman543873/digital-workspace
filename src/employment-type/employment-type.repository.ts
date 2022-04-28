import { Injectable } from '@nestjs/common';
import {
  EmploymentType,
  EmploymentTypeDocument,
} from './schema/employment-type.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, Types } from 'mongoose';
import { CreateEmploymentTypeInput } from './inputs/create-employment-type.input';
import { UpdateEmploymentTypeInput } from './inputs/update-employment-type.input';
import { DeleteEmploymentTypeInput } from './inputs/delete-employment-type.input';
import { Pagination } from '../shared/utils/pagination.input';
import { LookupSchemasEnum } from '../app.const';

@Injectable()
export class EmploymentTypeRepository extends BaseRepository<EmploymentType> {
  constructor(
    @InjectModel(EmploymentType.name)
    private employmentTypeSchema: AggregatePaginateModel<EmploymentTypeDocument>,
  ) {
    super(employmentTypeSchema);
  }

  findEmploymentType(input: { name?: string; id?: string }) {
    return this.employmentTypeSchema.findOne({
      ...input,
      ...(input.id && { _id: new Types.ObjectId(input.id) }),
    });
  }

  createEmploymentType(input: CreateEmploymentTypeInput) {
    return this.employmentTypeSchema.create(input);
  }

  deleteEmploymentType(input: DeleteEmploymentTypeInput) {
    return this.employmentTypeSchema.findOneAndDelete({
      _id: new Types.ObjectId(input.id),
    });
  }

  getEmploymentTypesList(input: Pagination) {
    const aggregation = this.employmentTypeSchema.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          as: 'members',
          let: { employmentType: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$employmentType', '$employmentType'],
                },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          members: { $size: '$members' },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return this.employmentTypeSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  updateEmploymentType(input: UpdateEmploymentTypeInput) {
    return this.employmentTypeSchema.findOneAndUpdate(
      {
        _id: new Types.ObjectId(input.id),
      },
      input,
      { new: true },
    );
  }
}
