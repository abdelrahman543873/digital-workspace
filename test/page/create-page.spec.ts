import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { buildPageParams } from '../../src/page/page.factory';
import { CREATE_PAGE } from '../endpoints/page.endpoints';
describe('create page suite case', () => {
  it('should create page', async () => {
    const user = await userFactory();
    const page = await buildPageParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: CREATE_PAGE,
      variables: {
        name: page.name,
      },
      token: user.token,
    });
    expect(res.body.name).toBe(page.name);
  });
});
