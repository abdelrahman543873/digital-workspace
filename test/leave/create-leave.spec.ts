import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildLeaveParams } from './factories/leave.factory';
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

  it("shouldn't create leave if leave type if it doesn't exist", async () => {
    const leave = await buildLeaveParams();
    const user = await userFactory({ leaveBalance: 1000 });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LEAVE,
      variables: {
        startDate: leave.startDate.toISOString(),
        endDate: leave.endDate.toISOString(),
        type: user._id.toString(),
        comment: leave.comment,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });

  it("shouldn't create leave if start date is bigger than endDate", async () => {
    const leave = await buildLeaveParams();
    const user = await userFactory({ leaveBalance: 1000 });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LEAVE,
      variables: {
        startDate: leave.endDate.toISOString(),
        endDate: leave.startDate.toISOString(),
        type: leave.type.toString(),
        comment: leave.comment,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
