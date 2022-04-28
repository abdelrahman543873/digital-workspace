import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { leaveFactory } from './leave.factory';
import { LEAVE } from '../endpoints/leave.endpoints';
describe('update leave case', () => {
  it('should update leave', async () => {
    const leave = await leaveFactory();
    const user = await userFactory({ leaveBalance: 1000 });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: LEAVE,
      variables: {
        id: leave._id.toString(),
        comment: user.description,
      },
      token: user.token,
    });
    expect(res.body.comment).toBe(user.description);
  });
});
