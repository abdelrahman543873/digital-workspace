import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { CREATE_TASK } from '../endpoints/task.endpoints';
import { buildTaskParams } from '../../src/task/task.factory';
describe('create task suite case', () => {
  it('should create task', async () => {
    const user = await userFactory();
    const { assigner, status, ...params } = await buildTaskParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CREATE_TASK,
      variables: params,
      token: user.token,
    });
    expect(res.body.title).toBe(params.title);
  });

  it('should create task with uploaded attachments', async () => {
    const user = await userFactory();
    const { assigner, status, ...params } = await buildTaskParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CREATE_TASK,
      variables: params,
      token: user.token,
      filePath,
      fileParam: 'attachments',
    });
    expect(res.body.attachments.length).toBe(1);
  });

  it('should create task with uploaded logo', async () => {
    const user = await userFactory();
    const { assigner, status, ...params } = await buildTaskParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CREATE_TASK,
      variables: params,
      token: user.token,
      filePath,
      fileParam: 'logo',
    });
    expect(res.body.logo).toContain('tasks');
  });
});
