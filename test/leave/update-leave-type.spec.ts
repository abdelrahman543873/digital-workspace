import { HTTP_METHODS_ENUM } from './../request.methods.enum';
import { testRequest } from './../request';
import { userFactory } from '../../src/user/user.factory';
import { LEAVE_TYPE } from '../endpoints/leave.endpoints';
import { leaveTypeFactory } from './leave-type.factory';
describe('update leave type case', () => {
  it('should update leave type', async () => {
    const user = await userFactory({});
    const leaveType = await leaveTypeFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: LEAVE_TYPE,
      variables: {
        id: leaveType._id.toString(),
        reason: user.description,
      },
      token: user.token,
    });
    expect(res.body.reason).toBe(user.description);
  });
});
