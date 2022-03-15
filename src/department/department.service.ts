import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { DepartmentInput } from './inputs/department.input';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async findDepartmentByName(name: string) {
    return await this.departmentRepository.findDepartmentByName(name);
  }

  async createDepartment(input: DepartmentInput) {
    return await this.departmentRepository.createDepartment(input);
  }
}
