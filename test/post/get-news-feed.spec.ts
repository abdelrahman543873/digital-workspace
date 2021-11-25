import { ADD_POST } from './../endpoints/post.endpoints';
import { FOLLOW_USER } from './../endpoints/user.endpoints';
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

  it("shouldn't get post if it's not published", async () => {
    const followed = await userFactory();
    const follower = await userFactory({ following: [followed._id] });
    const post = await postFactory({
      userId: followed._id,
      isPublished: false,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: NEWS_FEED,
      token: follower.token,
    });
    expect(res.body.totalDocs).toBe(0);
  });
  it("shouldn't get a post that is hidden", async () => {
    const followed = await userFactory();
    const firstPost = await postFactory({ userId: followed._id });
    const secondPost = await postFactory({ userId: followed._id });
    const follower = await userFactory({
      following: [followed._id],
      hiddenPosts: [firstPost._id],
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: NEWS_FEED,
      token: follower.token,
    });
    expect(res.body.docs[0]._id).toBe(secondPost._id.toString());
    expect(res.body.totalDocs).toBe(1);
  });

  it('should increase seen count', async () => {
    const followed = await userFactory();
    const follower = await userFactory({ following: [followed._id] });
    await postFactory({ userId: followed._id });
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

  it('should follow user then the followed user posts then get the post from the follower perspective', async () => {
    const followed = await userFactory();
    const follower = await userFactory();
    const followReq = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: FOLLOW_USER,
      variables: { userId: followed._id },
      token: follower.token,
    });
    expect(followReq.body.following[0]).toBe(followed._id.toString());
    const postReq = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_POST,
      variables: {
        content: 'a post',
      },
      token: followed.token,
    });
    expect(postReq.body.content).toBe('a post');
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: NEWS_FEED,
      token: follower.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(postReq.body._id.toString());
  });
});
