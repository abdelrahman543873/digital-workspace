import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { LOGIN } from '../endpoints/auth.endpoints';
import { buildUserParams } from '../../src/user/user.seed';
import { userFactory } from '../../src/user/user.factory';
describe('login suite case', () => {
  it('should login successfully', async () => {
    const params = buildUserParams();
    await userFactory({ ...params });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LOGIN,
      variables: {
        email: params.email,
        password: params.password,
      },
    });
    expect(res.body.token).toBeTruthy();
  });
});
