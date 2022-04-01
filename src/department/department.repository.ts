import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, Types } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { CreateDepartmentInput } from './inputs/create-department.input';
import { UpdateDepartmentInput } from './inputs/update-department.input';
import { DeleteDepartmentInput } from './inputs/delete-department.input';
import { Pagination } from '../shared/utils/pagination.input';
import { LookupSchemasEnum } from '../app.const';
import { Department, DepartmentDocument } from './schema/department.schema';

@Injectable()
export class DepartmentRepository extends BaseRepository<Department> {
  constructor(
    @InjectModel(Department.name)
    private departmentSchema: AggregatePaginateModel<DepartmentDocument>,
  ) {
    super(departmentSchema);
  }

  async findDepartment(input: { name?: string; id?: string }) {
    return await this.departmentSchema.findOne({
      ...input,
      ...(input.id && { _id: new Types.ObjectId(input.id) }),
    });
  }

  async createDepartment(input: CreateDepartmentInput) {
    return await this.departmentSchema.create(input);
  }

  async getDepartmentList(input: Pagination) {
    const aggregation = this.departmentSchema.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          as: 'departmentMembers',
          let: { departmentId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$departmentId', '$department'],
                },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          members: { $size: '$departmentMembers' },
        },
      },
      {
        $project: {
          departmentMembers: 0,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return await this.departmentSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  async updateDepartment(input: UpdateDepartmentInput) {
    return await this.departmentSchema.findOneAndUpdate(
      {
        _id: new Types.ObjectId(input.id),
      },
      input,
      { new: true },
    );
  }

  async deleteDepartment(input: DeleteDepartmentInput) {
    return await this.departmentSchema.findOneAndDelete({
      _id: new Types.ObjectId(input.id),
    });
  }
}
