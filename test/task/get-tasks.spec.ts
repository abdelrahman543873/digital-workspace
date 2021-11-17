import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { GET_TASKS } from '../endpoints/task.endpoints';
import { taskFactory } from '../../src/task/task.factory';
import { TASK_STATUS } from '../../src/app.const';
describe('get tasks suite case', () => {
  it('should get tasks', async () => {
    const user = await userFactory();
    const task = await taskFactory({ assignee: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_TASKS,
      token: user.token,
    });
    expect(res.body.docs[0].assigner._id.toString()).toBe(
      task.assigner.toString(),
    );
    expect(res.body.docs[0]._id.toString()).toBe(task._id.toString());
  });

  it('should get tasks with certain status', async () => {
    const user = await userFactory();
    const task = await taskFactory({
      assignee: user._id,
      status: TASK_STATUS[0],
    });
    await taskFactory({
      assignee: user._id,
      status: TASK_STATUS[1],
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_TASKS}?status=${TASK_STATUS[0]}`,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(task._id.toString());
    expect(res.body.totalDocs).toBe(1);
  });
});
