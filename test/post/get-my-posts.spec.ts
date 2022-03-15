import { POST_COMMENT } from './../endpoints/comment.endpoints';
import { commentFactory } from './../../src/comment/comment.factory';
import { GET_MY_POSTS } from './../endpoints/post.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { postFactory } from '../../src/post/post.factory';
import { userFactory } from '../../src/user/user.factory';
describe('get my posts suite case', () => {
  it('should get my posts', async () => {
    const user = await userFactory();
    const post = await postFactory({
      userId: user._id,
      likes: [user._id],
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_MY_POSTS,
      token: user.token,
    });
    expect(res.body.docs[0].likes[0].profilePic).toBeTruthy();
    expect(res.body.docs[0]._id.toString()).toBe(post._id.toString());
  });

  it("shouldn't get post if it's not published", async () => {
    const user = await userFactory();
    const post = await postFactory({
      userId: user._id,
      isPublished: false,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_MY_POSTS,
      token: user.token,
    });
    expect(res.body.totalDocs).toBe(0);
  });

  it("should get my posts with it's comments", async () => {
    const user = await userFactory();
    const post = await postFactory({
      userId: user._id,
    });
    const comment = await commentFactory({ post: post._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_MY_POSTS,
      token: user.token,
    });
    expect(res.body.docs[0].comments[0]._id.toString()).toBe(
      comment._id.toString(),
    );
    expect(res.body.docs[0]._id.toString()).toBe(post._id.toString());
  });

  it("should get my posts with it's comments after comment request", async () => {
    const user = await userFactory();
    const post = await postFactory({
      userId: user._id,
    });
    await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: POST_COMMENT,
      variables: {
        content: post.content,
        postId: post._id.toString(),
      },
      token: user.token,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_MY_POSTS,
      token: user.token,
    });
    expect(res.body.docs[0].content).toBe(post.content);
    expect(res.body.docs[0]._id.toString()).toBe(post._id.toString());
  });

  it('should get my posts if there are no posts', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_MY_POSTS,
      token: user.token,
    });
    expect(res.body.totalDocs).toBe(0);
  });
});
