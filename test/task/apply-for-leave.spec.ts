import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { APPLY_FOR_LEAVE } from '../endpoints/task.endpoints';
import { buildTaskParams } from '../../src/task/task.factory';
describe('apply for leave suite case', () => {
  it('should add leave', async () => {
    const user = await userFactory();
    const { assigner, status, title, logo, ...params } =
      await buildTaskParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: APPLY_FOR_LEAVE,
      variables: params,
      token: user.token,
    });
    expect(res.body.leaveDays).toBe(params.leaveDays);
  });

  it('should apply for leave with uploaded attachments', async () => {
    const user = await userFactory();
    const { assigner, status, title, logo, ...params } =
      await buildTaskParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: APPLY_FOR_LEAVE,
      variables: params,
      token: user.token,
      filePath,
      fileParam: 'attachments',
    });
    expect(res.body.attachments.length).toBe(1);
  });
});
