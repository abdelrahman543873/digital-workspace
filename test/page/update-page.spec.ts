import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { buildPageParams, pageFactory } from '../../src/page/page.factory';
import { UPDATE_PAGE } from '../endpoints/page.endpoints';
describe('update page suite case', () => {
  it('should update page', async () => {
    const user = await userFactory();
    const seededPage = await pageFactory({ admin: user._id });
    const page = await buildPageParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_PAGE,
      variables: {
        name: page.name,
        pageId: seededPage._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.name).toBe(page.name);
  });
});
