import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { UPDATE_TASK } from '../endpoints/task.endpoints';
import { buildTaskParams, taskFactory } from '../../src/task/task.factory';
describe('update task suite case', () => {
  it('should update task', async () => {
    const user = await userFactory();
    const { assigner, ...params } = await buildTaskParams();
    const task = await taskFactory({ assigner: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_TASK,
      variables: {
        title: params.title,
        taskId: task._id,
      },
      token: user.token,
    });
    expect(res.body.title).toBe(params.title);
  });
});
