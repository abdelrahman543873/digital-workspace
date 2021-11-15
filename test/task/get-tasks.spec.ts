import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { GET_TASKS } from '../endpoints/task.endpoints';
import { taskFactory } from '../../src/task/task.factory';
describe('get tasks suite case', () => {
  it('should get tasks', async () => {
    const user = await userFactory();
    const task = await taskFactory({ assignee: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_TASKS,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(task._id.toString());
  });
});
