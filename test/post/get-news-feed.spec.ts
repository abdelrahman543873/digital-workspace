import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { NEWS_FEED } from '../endpoints/post.endpoints';
import { postFactory } from '../../src/post/post.factory';
describe('get news feed suite case', () => {
  it('should get news feed suite case', async () => {
    const followed = await userFactory();
    const follower = await userFactory({ following: [followed._id] });
    const post = await postFactory({ userId: followed._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: NEWS_FEED,
      token: follower.token,
    });
    expect(res.body.docs[0]._id).toBe(post._id.toString());
  });

  it("should throw error if user is't following anyone", async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: NEWS_FEED,
      token: user.token,
    });
    expect(res.body.statusCode).toBe(605);
  });

  it('should get owned posts in the news feed ', async () => {
    const user = await userFactory();
    const post = await postFactory({ userId: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: NEWS_FEED,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(post._id.toString());
  });
});
