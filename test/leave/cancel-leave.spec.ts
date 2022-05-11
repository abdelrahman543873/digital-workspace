import { HTTP_METHODS_ENUM } from './../request.methods.enum';
import { testRequest } from './../request';
import { userFactory } from '../../src/user/user.factory';
import { CANCEL_LEAVE } from '../endpoints/leave.endpoints';
import { leaveFactory } from './leave.factory';
import { LEAVE_STATUS } from '../../src/leave/leave.enum';
import { UserRepo } from '../user/user-test-repo';
import { date } from 'faker';
describe('cancel leave case', () => {
  it('should cancel leave and return the subtracted days to the balance if the user has manager approved request', async () => {
    const user = await userFactory();
    const leave = await leaveFactory({
      employee: user._id,
      status: LEAVE_STATUS.MANAGER_APPROVED,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CANCEL_LEAVE,
      variables: {
        id: leave._id.toString(),
      },
      token: user.token,
    });
    const leaveBalanceAfterCancellation = (
      await UserRepo().findOne({ _id: user._id })
    ).leaveBalance;
    expect(res.body._id).toBe(leave._id.toString());
    expect(user.leaveBalance).toBeLessThan(leaveBalanceAfterCancellation);
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
    const leaveBalanceAfterCancellation = (
      await UserRepo().findOne({ _id: user._id })
    ).leaveBalance;
    expect(res.body._id).toBe(leave._id.toString());
    expect(user.leaveBalance).toBeLessThan(leaveBalanceAfterCancellation);
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
  });
});
