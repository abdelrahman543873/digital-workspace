import { TASK_STATUS } from './../../src/app.const';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { MANAGE_LEAVE } from '../endpoints/task.endpoints';
import { taskFactory } from '../../src/task/task.factory';
import { UserRepo } from '../user/user-test-repo';
describe('manage leave suite case', () => {
  it('should manage leave', async () => {
    const manager = await userFactory();
    const employee = await userFactory();
    const task = await taskFactory({
      assignee: manager._id,
      assigner: employee._id,
      status: TASK_STATUS[1],
    });
    const leaveBalanceBeforeAcceptance = (
      await UserRepo().findOne({ _id: employee._id })
    ).leaveBalance;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: { taskId: task._id.toString(), status: TASK_STATUS[0] },
      token: manager.token,
    });
    const leaveBalanceAfterAcceptance = (
      await UserRepo().findOne({ _id: employee._id })
    ).leaveBalance;
    expect(res.body.status).toBe(TASK_STATUS[0]);
    expect(
      Math.abs(leaveBalanceAfterAcceptance - leaveBalanceBeforeAcceptance),
    ).toBe(task.leaveDays);
  });
});
