import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { ROLE } from '../endpoints/role.endpoints';
import { userFactory } from '../../src/user/user.factory';
describe('get roles case', () => {
  it('should get roles', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: ROLE,
      token: user.token,
    });
    expect(res.body.docs.map((role) => role._id)).toContainEqual(
      user.role.toString(),
    );
  });
});
