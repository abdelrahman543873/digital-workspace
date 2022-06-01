import { HTTP_METHODS_ENUM } from './../request.methods.enum';
import { testRequest } from './../request';
import { userFactory } from '../../src/user/user.factory';
import { CANCEL_LEAVE } from '../endpoints/leave.endpoints';
import { leaveFactory } from './factories/leave.factory';
import { LEAVE_STATUS } from '../../src/leave/leave.enum';
import { date } from 'faker';
import { leaveUserFactory } from './factories/leave-user.factory';
import { leaveUserTestRepo } from './test-repos/leave-user-test-repo';
describe('cancel leave case', () => {
  it('should cancel leave and delete last approved leave request from leave user model with the same leave type', async () => {
    const user = await userFactory();
    const leave = await leaveFactory({
      employee: user._id,
      status: LEAVE_STATUS.APPROVED,
      startDate: date.future(),
    });
    const oldUserLeaveRequest = await leaveUserFactory({
      user: user._id,
      leaveType: leave.type,
    });
    const lastUserLeaveRequest = await leaveUserFactory({
      user: user._id,
      leaveType: leave.type,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CANCEL_LEAVE,
      variables: {
        id: leave._id.toString(),
      },
      token: user.token,
    });
    expect(
      await leaveUserTestRepo().findOne({ _id: oldUserLeaveRequest._id }),
    ).toBeTruthy();
    expect(
      await leaveUserTestRepo().findOne({ _id: lastUserLeaveRequest._id }),
    ).toBeFalsy();
    expect(res.body._id).toBe(leave._id.toString());
  });

  it('should cancel leave if approved but not effective yet', async () => {
    const user = await userFactory();
    const leave = await leaveFactory({
      employee: user._id,
      status: LEAVE_STATUS.APPROVED,
      startDate: date.future(),
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CANCEL_LEAVE,
      variables: {
        id: leave._id.toString(),
      },
      token: user.token,
    });
    expect(res.body._id).toBe(leave._id.toString());
  });

  it("shouldn't cancel leave if approved and effective", async () => {
    const user = await userFactory();
    const leave = await leaveFactory({
      employee: user._id,
      status: LEAVE_STATUS.APPROVED,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CANCEL_LEAVE,
      variables: {
        id: leave._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(1);
  });
});
