import { EmploymentTypeRepository } from '../../src/employment-type/employment-type.repository';

export const EmploymentTypeTestRepo = (): EmploymentTypeRepository =>
  global.employmentTypeRepository;
