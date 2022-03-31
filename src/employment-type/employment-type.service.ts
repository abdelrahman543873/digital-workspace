import { Injectable } from '@nestjs/common';
import { EmploymentTypeRepository } from './employment-type.repository';
import { CreateEmploymentTypeInput } from './inputs/create-employment-type.input';
import { UpdateEmploymentTypeInput } from './inputs/update-employment-type.input';
import { DeleteEmploymentTypeInput } from './inputs/delete-employment-type.input';
import { Pagination } from '../shared/utils/pagination.input';

@Injectable()
export class EmploymentTypeService {
  constructor(private employmentTypeRepository: EmploymentTypeRepository) {}

  createEmploymentType(input: CreateEmploymentTypeInput) {
    return this.employmentTypeRepository.createEmploymentType(input);
  }

  updateEmploymentType(input: UpdateEmploymentTypeInput) {
    return this.employmentTypeRepository.updateEmploymentType(input);
  }

  deleteEmploymentType(input: DeleteEmploymentTypeInput) {
    return this.employmentTypeRepository.deleteEmploymentType(input);
  }

  getEmploymentTypesList(input: Pagination) {
    return this.employmentTypeRepository.getEmploymentTypesList(input);
  }
}
