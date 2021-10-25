import { GET_TEST_USERS } from './../endpoints/user.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
describe('get test users suite case', () => {
  it('should get test users', async () => {
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_TEST_USERS,
    });
    expect(res.body.length).toBe(10);
  });
});
