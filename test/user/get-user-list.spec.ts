import { GET_USER_LIST } from './../endpoints/user.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
describe('get user list suite case', () => {
  it('should get user list', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_USER_LIST,
      token: user.token,
    });
    expect(res.body.docs[0].team).toHaveProperty('_id');
    expect(res.body.docs[0].title).toHaveProperty('_id');
    expect(res.body.totalDocs).toBeGreaterThanOrEqual(1);
  });
});
