import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { pageFactory } from '../../src/page/page.factory';
import { DELETE_PAGE } from '../endpoints/page.endpoints';
describe('delete page suite case', () => {
  it('should delete page', async () => {
    const user = await userFactory();
    const page = await pageFactory({ admin: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: DELETE_PAGE,
      variables: { pageId: page._id.toString() },
      token: user.token,
    });
    expect(res.body._id.toString()).toBe(page._id.toString());
  });
});
