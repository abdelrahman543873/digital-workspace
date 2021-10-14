import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { ADD_USER } from '../endpoints/user.endpoints';
import { buildUserParams } from '../../src/user/user.factory';
describe('register user suite case', () => {
  it('should register user', async () => {
    const params = buildUserParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_USER,
      variables: params,
    });
    expect(res.body.email).toBe(params.email);
  });
});
