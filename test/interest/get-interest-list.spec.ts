import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { interestFactory } from '../../src/interest/interest.factory';
import { INTERESTS_LIST } from '../endpoints/interest.endpoints';
describe('get interest list case', () => {
  it('should get interests list', async () => {
    const interest = await interestFactory();
    const user = await userFactory({ interests: [interest._id] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: INTERESTS_LIST,
      token: user.token,
    });
    expect(res.body.docs[0].members).toBe(1);
  });
});
