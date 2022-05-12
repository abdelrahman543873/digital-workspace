import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { LEAVES_LIST } from '../endpoints/leave.endpoints';
import { testRequest } from '../request';
import { leaveFactory } from './leave.factory';
import { userFactory } from '../../src/user/user.factory';
import { LEAVE_STATUS } from '../../src/leave/leave.enum';
describe('get leaves list case', () => {
  it('should get leaves list', async () => {
    const user = await userFactory();
    const leave = await leaveFactory({ employee: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: LEAVES_LIST,
      token: user.token,
    });
    expect(res.body.docs[0].comment).toBe(leave.comment);
  });

  it('should get leaves list sorted by status', async () => {
    const user = await userFactory();
    const leave = await leaveFactory({
      employee: user._id,
      status: LEAVE_STATUS.REJECTED,
    });
    const secondLeave = await leaveFactory({
      employee: user._id,
      status: LEAVE_STATUS.APPROVED,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: LEAVES_LIST,
      token: user.token,
    });
    expect(res.body.docs[0]._id).toBe(secondLeave._id.toString());
    expect(res.body.docs[1]._id).toBe(leave._id.toString());
  });
});
