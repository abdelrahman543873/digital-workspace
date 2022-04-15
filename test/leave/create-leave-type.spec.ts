import { HTTP_METHODS_ENUM } from './../request.methods.enum';
import { testRequest } from './../request';
import { buildLeaveTypeParams } from './leave-type.factory';
import { userFactory } from '../../src/user/user.factory';
import { LEAVE_TYPE } from '../endpoints/leave.endpoints';
describe('create leave type case', () => {
  it('should create leave type', async () => {
    const leaveType = buildLeaveTypeParams();
    const user = await userFactory({});
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LEAVE_TYPE,
      variables: {
        reason: leaveType.reason,
      },
      token: user.token,
    });
    expect(res.body.reason).toBe(leaveType.reason);
  });
});
