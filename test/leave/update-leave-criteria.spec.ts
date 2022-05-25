import { HTTP_METHODS_ENUM } from './../request.methods.enum';
import { testRequest } from './../request';
import { userFactory } from '../../src/user/user.factory';
import { LEAVE_CRITERIA } from '../endpoints/leave.endpoints';
import {
  buildLeaveCriteriaParams,
  leaveCriteriaFactory,
} from './factories/leave-criteria.factory';
describe('update leave criteria', () => {
  it('should update leave criteria', async () => {
    const user = await userFactory();
    const params = await buildLeaveCriteriaParams();
    const leaveCriteria = await leaveCriteriaFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: LEAVE_CRITERIA,
      variables: { id: leaveCriteria._id.toString(), ...params },
      token: user.token,
    });
    expect(res.body.maximumDays).toBe(params.maximumDays);
  });
});
