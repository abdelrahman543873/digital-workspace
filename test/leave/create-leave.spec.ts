import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildLeaveParams } from './leave.factory';
import { LEAVE } from '../endpoints/leave.endpoints';
describe('create leave case', () => {
  it('should create leave', async () => {
    const leave = await buildLeaveParams();
    const user = await userFactory({ leaveBalance: 1000 });
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LEAVE,
      variables: {
        startDate: leave.startDate.toISOString(),
        endDate: leave.endDate.toISOString(),
        type: leave.type.toString(),
        comment: leave.comment,
      },
      token: user.token,
      filePath,
      fileParam: 'attachments',
    });
    expect(res.body.type).toBe(decodeURI(encodeURI(leave.type.toString())));
    expect(res.body.attachments.length).toBeGreaterThanOrEqual(1);
  });
});
