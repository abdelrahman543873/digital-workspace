import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildRejectionReasonParams } from './factories/rejection-reason.factory';
import { REJECTION_REASON } from '../endpoints/leave.endpoints';
describe('add rejection reason case', () => {
  it('should add rejection reason', async () => {
    const user = await userFactory();
    const rejectionReason = buildRejectionReasonParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: REJECTION_REASON,
      variables: rejectionReason,
      token: user.token,
    });
    expect(res.body.name).toBe(rejectionReason.name);
  });
});
