import { DepartmentTestRepo } from './department-test-repo';
import { name, datatype } from 'faker';
import { Department } from '../../src/department/schema/department.schema.input';

interface DepartmentType {
  name?: string;
  description?: string;
}

export const buildDepartmentParams = (
  obj: DepartmentType = {},
): DepartmentType => {
  return {
    name: obj.name || datatype.uuid(),
    description: obj.description || name.jobDescriptor(),
  };
};

export const departmentsFactory = async (
  count = 10,
  obj: DepartmentType = {},
): Promise<Department[]> => {
  const departments: DepartmentType[] = [];
  for (let i = 0; i < count; i++) {
    departments.push(buildDepartmentParams(obj));
  }
  return await DepartmentTestRepo().addMany(departments);
};

export const departmentFactory = async (
  obj: DepartmentType = {},
): Promise<Department> => {
  const params: DepartmentType = buildDepartmentParams(obj);
  return await DepartmentTestRepo().add(params);
};
