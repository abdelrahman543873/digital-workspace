import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { NEWS_FEED } from '../endpoints/post.endpoints';
import { postFactory } from '../../src/post/post.factory';
import { commentFactory } from '../../src/comment/comment.factory';
describe('get news feed suite case', () => {
  it('should get news feed', async () => {
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

  it('should increase seen count', async () => {
    const followed = await userFactory();
    const follower = await userFactory({ following: [followed._id] });
    const post = await postFactory({ userId: followed._id });
    await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: NEWS_FEED,
      token: follower.token,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: NEWS_FEED,
      token: follower.token,
    });
    expect(res.body.docs[0].seen.length).toBe(2);
  });

  it('should get news feed in recent order', async () => {
    const followed = await userFactory();
    const follower = await userFactory({ following: [followed._id] });
    const oldPost = await postFactory({
      userId: followed._id,
      createdAt: new Date('2020-11-10T07:42:41.910Z'),
    });
    const recentPost = await postFactory({
      userId: followed._id,
      createdAt: new Date(),
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: NEWS_FEED,
      token: follower.token,
    });
    expect(res.body.docs[0]._id).toBe(recentPost._id.toString());
    expect(res.body.docs[1]._id).toBe(oldPost._id.toString());
  });

  it('should get news feeds with comments', async () => {
    const followed = await userFactory();
    const follower = await userFactory({ following: [followed._id] });
    const post = await postFactory({ userId: followed._id });
    const comment = await commentFactory({ post: post._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: NEWS_FEED,
      token: follower.token,
    });
    expect(res.body.docs[0].comments[0].commenter).toHaveProperty('profilePic');
    expect(res.body.docs[0].comments[0].content).toBe(comment.content);
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

  it('should get owned posts in the news feed and get users data', async () => {
    const user = await userFactory();
    const post = await postFactory({ userId: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: NEWS_FEED,
      token: user.token,
    });
    expect(res.body.docs[0].user._id.toString()).toBe(user._id.toString());
    expect(res.body.docs[0]._id.toString()).toBe(post._id.toString());
  });
});
