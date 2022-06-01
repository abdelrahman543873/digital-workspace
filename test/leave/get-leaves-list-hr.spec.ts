import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { LEAVES_HR_LIST } from '../endpoints/leave.endpoints';
import { testRequest } from '../request';
import { leaveFactory } from './factories/leave.factory';
import { userFactory } from '../../src/user/user.factory';
import { LEAVE_STATUS } from '../../src/leave/leave.enum';
describe('get hr leaves list case', () => {
  it('should get assigned leaves list', async () => {
    const manager = await userFactory();
    const user = await userFactory({ directManagerId: manager._id });
    const leave = await leaveFactory({ employee: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: LEAVES_HR_LIST,
      token: manager.token,
    });
    expect(res.body.docs[0].employee.department).toHaveProperty('_id');
    expect(res.body.docs[0].comment).toBe(leave.comment);
    expect(res.body.docs[0].type).toHaveProperty('_id');
    expect(res.body.docs[0].employee).toHaveProperty('_id');
    expect(res.body.docs[0].replacement).toHaveProperty('_id');
  });

  it('should get assigned leaves list filtered by status', async () => {
    const manager = await userFactory();
    const user = await userFactory({ directManagerId: manager._id });
    const leave = await leaveFactory({
      employee: user._id,
      status: LEAVE_STATUS.APPROVED,
    });
    await leaveFactory({
      employee: user._id,
      status: LEAVE_STATUS.REJECTED,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${LEAVES_HR_LIST}?status=${leave.status}`,
      token: manager.token,
    });
    expect(res.body.docs[0].employee.department).toHaveProperty('_id');
    expect(res.body.docs[0].comment).toBe(leave.comment);
    expect(res.body.docs[0].type).toHaveProperty('_id');
    expect(res.body.docs[0].employee).toHaveProperty('_id');
    expect(res.body.docs[0].replacement).toHaveProperty('_id');
    expect(res.body.totalDocs).toBe(1);
  });
});
