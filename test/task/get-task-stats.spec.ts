import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { GET_TASKS_STATS } from '../endpoints/task.endpoints';
import { taskFactory } from '../../src/task/task.factory';
import { TASK_STATUS } from '../../src/app.const';
describe('get tasks stats suite case', () => {
  it('should get tasks stats', async () => {
    const user = await userFactory();
    await taskFactory({
      assignee: user._id,
      status: TASK_STATUS[0],
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_TASKS_STATS,
      token: user.token,
    });
    expect(res.body.total).toBe(1);
    expect(res.body.done).toBe(1);
    expect(res.body.pending).toBe(0);
  });

  it('should get tasks stats', async () => {
    const user = await userFactory();
    await taskFactory({
      assignee: user._id,
      status: TASK_STATUS[1],
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_TASKS_STATS,
      token: user.token,
    });
    expect(res.body.total).toBe(1);
    expect(res.body.pending).toBe(1);
  });
});
