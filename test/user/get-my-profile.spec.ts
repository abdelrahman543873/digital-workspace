import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { GET_MY_PROFILE } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
describe('get my profile suite case', () => {
  it('should get my profile', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_MY_PROFILE,
      token: user.token,
    });
    expect(res.body._id.toString()).toBe(user._id.toString());
  });
});
