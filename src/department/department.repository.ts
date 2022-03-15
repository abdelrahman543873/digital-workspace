import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { DepartmentInput } from './inputs/department.input';
import {
  Department,
  DepartmentDocument,
} from './schema/department.schema.input';

@Injectable()
export class DepartmentRepository extends BaseRepository<Department> {
  constructor(
    @InjectModel(Department.name)
    private departmentSchema: AggregatePaginateModel<DepartmentDocument>,
  ) {
    super(departmentSchema);
  }

  async findDepartmentByName(name: string) {
    return await this.departmentSchema.findOne({ name });
  }

  async createDepartment(input: DepartmentInput) {
    return await this.departmentSchema.create(input);
  }
}
