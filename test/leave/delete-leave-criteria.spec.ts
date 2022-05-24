import { HTTP_METHODS_ENUM } from './../request.methods.enum';
import { testRequest } from './../request';
import { userFactory } from '../../src/user/user.factory';
import { LEAVE_CRITERIA } from '../endpoints/leave.endpoints';
import { leaveCriteriaFactory } from './factories/leave-criteria.factory';
describe('delete leave criteria', () => {
  it('should delete leave criteria', async () => {
    const user = await userFactory();
    const leaveCriteria = await leaveCriteriaFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: LEAVE_CRITERIA,
      variables: { id: leaveCriteria._id.toString() },
      token: user.token,
    });
    expect(res.body.deletedCount).toBe(1);
  });
});
