import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { DEPARTMENT_LIST } from '../endpoints/department.endpoints';
import { departmentFactory } from './department.factory';
describe('get department list case', () => {
  it('should get department list', async () => {
    const department = await departmentFactory();
    const user = await userFactory({ department: department._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: DEPARTMENT_LIST,
      token: user.token,
    });
    expect(res.body.docs[0].members).toBe(1);
  });
});
