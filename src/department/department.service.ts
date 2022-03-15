import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { CreateDepartmentInput } from './inputs/create-department.input';
import { UpdateDepartmentInput } from './inputs/update-department.input';
import { DeleteDepartmentInput } from './inputs/delete-department.input';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async findDepartment(input: { name?: string; id?: string }) {
    return await this.departmentRepository.findDepartment(input);
  }

  async createDepartment(input: CreateDepartmentInput) {
    return await this.departmentRepository.createDepartment(input);
  }

  async updateDepartment(input: UpdateDepartmentInput) {
    return await this.departmentRepository.updateDepartment(input);
  }

  async deleteDepartment(input: DeleteDepartmentInput) {
    return await this.departmentRepository.deleteDepartment(input);
  }
}
