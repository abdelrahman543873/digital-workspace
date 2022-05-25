import { HTTP_METHODS_ENUM } from './../request.methods.enum';
import { testRequest } from './../request';
import { userFactory } from '../../src/user/user.factory';
import { LEAVE_CRITERIA_LIST } from '../endpoints/leave.endpoints';
import { leaveCriteriaFactory } from './factories/leave-criteria.factory';
describe('get leave criteria list', () => {
  it('should get leave criteria list', async () => {
    const user = await userFactory();
    await leaveCriteriaFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: LEAVE_CRITERIA_LIST,
      token: user.token,
    });
    expect(res.body.totalDocs).toBe(1);
    expect(res.body.docs[0].leaveType).toHaveProperty('_id');
  });
});
