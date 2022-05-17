import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { ASSIGNED_LEAVES_LIST } from '../endpoints/leave.endpoints';
import { testRequest } from '../request';
import { leaveFactory } from './leave.factory';
import { userFactory } from '../../src/user/user.factory';
describe('get assigned leaves list case', () => {
  it('should get assigned leaves list', async () => {
    const manager = await userFactory();
    const user = await userFactory({ directManagerId: manager._id });
    const leave = await leaveFactory({ employee: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: ASSIGNED_LEAVES_LIST,
      token: manager.token,
    });
    expect(res.body.docs[0].comment).toBe(leave.comment);
    expect(res.body.docs[0].type).toHaveProperty('_id');
    expect(res.body.docs[0].employee).toHaveProperty('_id');
    expect(res.body.docs[0].replacement).toHaveProperty('_id');
  });
});
