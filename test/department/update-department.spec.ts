import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { DEPARTMENT } from '../endpoints/department.endpoints';
import { buildDepartmentParams, departmentFactory } from './department.factory';
import { DepartmentTestRepo } from './department-test-repo';
describe('update department case', () => {
  it('should update department', async () => {
    const user = await userFactory();
    const seededDepartment = await departmentFactory();
    const department = buildDepartmentParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: DEPARTMENT,
      variables: {
        id: seededDepartment._id.toString(),
        name: department.name,
        description: department.description,
      },
      token: user.token,
    });
    expect(res.body.name).toBe(department.name);
  });

  it('should throw error when department name already exists', async () => {
    const user = await userFactory();
    const department = await departmentFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: DEPARTMENT,
      variables: {
        id: department._id.toString(),
        name: department.name,
        description: department.description,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });

  it("should throw error when department id doesn't exist", async () => {
    const user = await userFactory();
    const department = await departmentFactory();
    await DepartmentTestRepo().deleteOne({ _id: department._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: DEPARTMENT,
      variables: {
        id: department._id,
        name: department.name,
        description: department.description,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
