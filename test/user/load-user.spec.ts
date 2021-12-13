import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { LOAD_USER } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
describe('load user suite case', () => {
  it('should load user', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LOAD_USER,
      token: user.token,
    });
    console.log(res.body);
  });
});
