import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { DEPARTMENT } from '../endpoints/department.endpoints';
import { buildDepartmentParams, departmentFactory } from './department.factory';
describe('create department case', () => {
  it('should create department', async () => {
    const user = await userFactory();
    const department = buildDepartmentParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: DEPARTMENT,
      variables: department,
      token: user.token,
    });
    expect(res.body.name).toBe(department.name);
  });

  it('should throw error when department name already exists', async () => {
    const user = await userFactory();
    const department = await departmentFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: DEPARTMENT,
      variables: { name: department.name, description: department.description },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
