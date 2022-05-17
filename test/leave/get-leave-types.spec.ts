import { HTTP_METHODS_ENUM } from './../request.methods.enum';
import { testRequest } from './../request';
import { userFactory } from '../../src/user/user.factory';
import { LEAVE_TYPES } from '../endpoints/leave.endpoints';
import { leaveFactory } from './factories/leave.factory';
describe('get leaves type case', () => {
  it('should get leaves type', async () => {
    await leaveFactory();
    const user = await userFactory({});
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: LEAVE_TYPES,
      token: user.token,
    });
    expect(res.body.docs.length).toBeGreaterThanOrEqual(1);
  });
});
