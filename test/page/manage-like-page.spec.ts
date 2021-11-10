import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { pageFactory } from '../../src/page/page.factory';
import { MANAGE_LIKE_PAGE } from '../endpoints/page.endpoints';
describe('page manage like suite case', () => {
  it('should like page', async () => {
    const user = await userFactory();
    const page = await pageFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LIKE_PAGE,
      variables: {
        pageId: page._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.likes[1].toString()).toBe(user._id.toString());
  });

  it('should dislike page', async () => {
    const user = await userFactory();
    const page = await pageFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LIKE_PAGE,
      variables: {
        pageId: page._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.likes[1].toString()).toBe(user._id.toString());
    const res2 = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LIKE_PAGE,
      variables: {
        pageId: page._id.toString(),
      },
      token: user.token,
    });
    expect(res2.body.likes.length).toBe(1);
  });
});
