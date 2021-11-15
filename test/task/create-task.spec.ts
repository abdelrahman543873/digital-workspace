import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { CREATE_TASK } from '../endpoints/task.endpoints';
import { buildTaskParams } from '../../src/task/task.factory';
describe('create task suite case', () => {
  it('should create task', async () => {
    const user = await userFactory();
    const { assigner, ...params } = await buildTaskParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CREATE_TASK,
      variables: params,
      token: user.token,
    });
    expect(res.body.title).toBe(params.title);
  });
});
