import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { pageFactory } from '../../src/page/page.factory';
import { SEARCH_PAGES } from '../endpoints/page.endpoints';
describe('search pages suite case', () => {
  it('should search pages by inexact', async () => {
    const user = await userFactory();
    const page = await pageFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_PAGES}/${page.name.substring(0, 2)}`,
      token: user.token,
    });
    expect(res.body.docs.length).toBeGreaterThanOrEqual(1);
  });
});
