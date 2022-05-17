import { HTTP_METHODS_ENUM } from './../request.methods.enum';
import { testRequest } from './../request';
import { buildLeaveTypeParams } from './factories/leave-type.factory';
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
        name: leaveType.name,
      },
      token: user.token,
    });
    expect(res.body.name).toBe(leaveType.name);
  });
});
