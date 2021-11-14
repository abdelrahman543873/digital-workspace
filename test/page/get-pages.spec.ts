import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { pageFactory } from '../../src/page/page.factory';
import { GET_PAGES } from '../endpoints/page.endpoints';
describe('get pages suite case', () => {
  it('should get  pages', async () => {
    const user = await userFactory();
    await pageFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_PAGES,
      token: user.token,
    });
    expect(res.body.docs.length).toBeGreaterThanOrEqual(1);
  });
});
