import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { LEAVES_LIST } from '../endpoints/leave.endpoints';
import { testRequest } from '../request';
import { leaveFactory } from './leave.factory';
import { userFactory } from '../../src/user/user.factory';
describe('get leaves list case', () => {
  it('should create leave', async () => {
    const user = await userFactory();
    const leave = await leaveFactory({ employee: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: LEAVES_LIST,
      token: user.token,
    });
    expect(res.body.docs[0].comment).toBe(leave.comment);
  });
});
