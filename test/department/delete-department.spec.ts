import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { DEPARTMENT } from '../endpoints/department.endpoints';
import { departmentFactory } from './department.factory';
import { DepartmentTestRepo } from './department-test-repo';
describe('delete department case', () => {
  it('should delete department', async () => {
    const user = await userFactory();
    const department = await departmentFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: DEPARTMENT,
      variables: { id: department._id.toString() },
      token: user.token,
    });
    expect(res.body.name).toBe(department.name);
  });

  it("shouldn't delete department if id doesn't exist", async () => {
    const user = await userFactory();
    const department = await departmentFactory();
    await DepartmentTestRepo().deleteOne({ _id: department._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: DEPARTMENT,
      variables: { id: department._id.toString() },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
