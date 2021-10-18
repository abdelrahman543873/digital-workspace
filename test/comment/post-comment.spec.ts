import { postFactory } from './../../src/post/post.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { POST_COMMENT } from '../endpoints/comment.endpoints';
describe('post comment suite case', () => {
  it('should comment on a post', async () => {
    const user = await userFactory();
    const postParams = await postFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: POST_COMMENT,
      variables: {
        content: postParams.content,
        postId: postParams._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.content).toBe(postParams.content);
    expect(res.body.commenter).toBe(user._id.toString());
  });
});
