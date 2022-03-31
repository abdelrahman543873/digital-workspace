import { Injectable } from '@nestjs/common';
import { EmploymentTypeRepository } from './employment-type.repository';
import { CreateEmploymentTypeInput } from './inputs/create-employment-type.input';

@Injectable()
export class EmploymentTypeService {
  constructor(private employmentTypeRepository: EmploymentTypeRepository) {}

  createEmploymentType(input: CreateEmploymentTypeInput) {
    return this.employmentTypeRepository.createEmploymentType(input);
  }
}
