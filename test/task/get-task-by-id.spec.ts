import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { GET_TASK_BY_ID } from '../endpoints/task.endpoints';
import { taskFactory } from '../../src/task/task.factory';
describe('get task suite case', () => {
  it('should get task', async () => {
    const user = await userFactory();
    const task = await taskFactory({ assignee: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_TASK_BY_ID}/${task._id.toString()}`,
      token: user.token,
    });
    expect(res.body._id).toBe(task._id.toString());
  });
});
