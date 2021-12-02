import { DELETE_USER_BY_ID } from './../endpoints/user.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
describe('delete user by id suite case', () => {
  it('should delete user by id', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: DELETE_USER_BY_ID,
      variables: { userId: user._id.toString() },
      token: user.token,
    });
    expect(res.body._id.toString()).toBe(user._id.toString());
  });
});
