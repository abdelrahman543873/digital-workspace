import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { ROLE } from '../endpoints/role.endpoints';
import { buildRoleParams } from '../../src/role/role.factory';
describe('create role case', () => {
  it('should create role', async () => {
    const user = await userFactory();
    const role = buildRoleParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ROLE,
      variables: role,
      token: user.token,
    });
    expect(res.body.name).toBe(role.name);
  });
});
