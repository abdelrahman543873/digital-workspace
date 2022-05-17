import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { rejectionReasonFactory } from './factories/rejection-reason.factory';
import { REJECTION_REASONS_LIST } from '../endpoints/leave.endpoints';
describe('get rejection reasons list case', () => {
  it('should get rejection reasons list', async () => {
    const user = await userFactory();
    await rejectionReasonFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: REJECTION_REASONS_LIST,
      token: user.token,
    });
    expect(res.body.totalDocs).toBeGreaterThanOrEqual(1);
  });
});
