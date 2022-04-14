import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildLeaveParams } from './leave.factory';
import { LEAVE } from '../endpoints/leave.endpoints';
describe('create leave case', () => {
  it('should create leave', async () => {
    const user = await userFactory();
    const leave = await buildLeaveParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LEAVE,
      variables: {
        startDate: leave.startDate,
        endDate: leave.endDate,
        reason: leave.reason.toString(),
        comment: leave.comment,
      },
      token: user.token,
    });
    expect(res.body.reason).toBe(decodeURI(encodeURI(leave.reason.toString())));
  });
});
