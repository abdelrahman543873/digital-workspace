import { HTTP_METHODS_ENUM } from './../request.methods.enum';
import { testRequest } from './../request';
import { userFactory } from '../../src/user/user.factory';
import { LEAVE_CRITERIA } from '../endpoints/leave.endpoints';
import { buildLeaveCriteriaParams } from './factories/leave-criteria.factory';
describe('create leave criteria', () => {
  it('should create leave criteria', async () => {
    const user = await userFactory();
    const leaveCriteria = await buildLeaveCriteriaParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LEAVE_CRITERIA,
      variables: leaveCriteria,
      token: user.token,
    });
    expect(res.body.leaveTypeId).toBe(leaveCriteria.leaveType.toString());
  });
});
