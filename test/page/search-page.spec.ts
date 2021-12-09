import { buildPageParams } from './../../src/page/page.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { pageFactory } from '../../src/page/page.factory';
import { CREATE_PAGE, SEARCH_PAGES } from '../endpoints/page.endpoints';
describe('search pages suite case', () => {
  it('should search pages by inexact', async () => {
    const user = await userFactory();
    const page = await pageFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_PAGES}?keyword=${page.name.substring(0, 2)}`,
      token: user.token,
    });
    expect(res.body.docs.length).toBeGreaterThanOrEqual(1);
  });

  it('should create page and find it in search', async () => {
    const user = await userFactory();
    const page = await buildPageParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CREATE_PAGE,
      variables: {
        name: page.name,
      },
      token: user.token,
    });
    const res1 = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_PAGES}?keyword=${res.body.name.substring(0, 2)}`,
      token: user.token,
    });
    expect(res1.body.docs[0].name).toBe(res.body.name);
  });
});
