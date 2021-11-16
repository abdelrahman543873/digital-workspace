import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { pageFactory } from '../../src/page/page.factory';
import { LIKED_PAGES } from '../endpoints/page.endpoints';
describe('get liked pages suite case', () => {
  it('should get liked pages', async () => {
    const user = await userFactory();
    await pageFactory({ likes: [user._id] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: LIKED_PAGES,
      token: user.token,
    });
    expect(res.body.docs[0].likes[0].fullName).toBe(user.fullName);
  });
});
