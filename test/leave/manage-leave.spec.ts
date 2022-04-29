import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { MANAGE_LEAVE } from '../endpoints/leave.endpoints';
import { userFactory } from '../../src/user/user.factory';
import { leaveFactory } from './leave.factory';
import { testRequest } from '../request';
import { LEAVE_STATUS } from '../../src/leave/leave.enum';
describe('manage leave case', () => {
  it('should manage leave', async () => {
    const manager = await userFactory();
    const employee = await userFactory({ directManagerId: manager._id });
    const leave = await leaveFactory({ employee: employee._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.APPROVED,
      },
      token: manager.token,
    });
    expect(res.body.status).toBe(LEAVE_STATUS.APPROVED);
  });

  it("should throw error when approval isn't from manager", async () => {
    const manager = await userFactory();
    const employee = await userFactory();
    const leave = await leaveFactory({ employee: employee._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.APPROVED,
      },
      token: manager.token,
    });
    expect(res.body.statusCode).toBe(400);
  });

  it("should throw error when leave doesn't exist", async () => {
    const manager = await userFactory();
    const employee = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: employee._id.toString(),
        status: LEAVE_STATUS.APPROVED,
      },
      token: manager.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
