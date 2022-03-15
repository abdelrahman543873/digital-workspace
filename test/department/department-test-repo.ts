import { DepartmentRepository } from '../../src/department/department.repository';

export const DepartmentTestRepo = (): DepartmentRepository =>
  global.departmentRepository;
