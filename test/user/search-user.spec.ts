import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { SEARCH_USER } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
describe('search user suite case', () => {
  it('should search user by email', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_USER}?email=${user.email}`,
      token: user.token,
    });
    expect(res.body[0]._id.toString()).toBe(user._id.toString());
  });

  it('should search user by username', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_USER}?username=${user.username}`,
      token: user.token,
    });
    expect(res.body[0]._id.toString()).toBe(user._id.toString());
  });

  it('should search user by username inexact', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_USER}?username=${user.username.substr(3)}`,
      token: user.token,
    });
    expect(res.body[0]._id.toString()).toBe(user._id.toString());
  });
});
