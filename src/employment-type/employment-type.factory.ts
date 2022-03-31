import { name, datatype } from 'faker';
import { Department } from '../../src/department/schema/department.schema.input';
import { EmploymentTypeTestRepo } from '../../test/employment-type/employment-type-test-repo';

interface EmploymentTypeType {
  name?: string;
  description?: string;
}

export const buildEmploymentTypeParams = (
  obj: EmploymentTypeType = {},
): EmploymentTypeType => {
  return {
    name: obj.name || datatype.uuid(),
    description: obj.description || name.jobDescriptor(),
  };
};

export const EmploymentTypesFactory = async (
  count = 10,
  obj: EmploymentTypeType = {},
): Promise<Department[]> => {
  const employmentTypes: EmploymentTypeType[] = [];
  for (let i = 0; i < count; i++) {
    employmentTypes.push(buildEmploymentTypeParams(obj));
  }
  return await EmploymentTypeTestRepo().addMany(employmentTypes);
};

export const EmploymentTypeFactory = async (
  obj: EmploymentTypeType = {},
): Promise<Department> => {
  const params: EmploymentTypeType = buildEmploymentTypeParams(obj);
  return await EmploymentTypeTestRepo().add(params);
};
