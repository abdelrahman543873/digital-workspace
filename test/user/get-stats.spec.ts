import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { STATS } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
import { postFactory } from '../../src/post/post.factory';
import { groupFactory } from '../../src/group/group.factory';
import { pageFactory } from '../../src/page/page.factory';
describe('get stats suite case', () => {
  it('should get stats', async () => {
    const followingUser = await userFactory();
    const user = await userFactory({ followers: [followingUser._id] });
    await postFactory({ userId: user._id });
    await groupFactory({ members: [user._id] });
    await pageFactory({ likes: [user._id] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: STATS,
      token: user.token,
    });
    expect(res.body.pages).toBe(1);
    expect(res.body.groups).toBe(1);
    expect(res.body.posts).toBe(1);
    expect(res.body.followers).toBe(1);
  });

  it('should get stats with id', async () => {
    const followingUser = await userFactory();
    const user = await userFactory({ followers: [followingUser._id] });
    await postFactory({ userId: user._id });
    await groupFactory({ members: [user._id] });
    await pageFactory({ likes: [user._id] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${STATS}?userId=${user._id}`,
      token: user.token,
    });
    expect(res.body.pages).toBe(1);
    expect(res.body.groups).toBe(1);
    expect(res.body.posts).toBe(1);
    expect(res.body.followers).toBe(1);
  });
});
