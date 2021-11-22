import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { HIDE_POST } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
import { postFactory } from '../../src/post/post.factory';
describe('hide post suite case', () => {
  it('should hide post', async () => {
    const user = await userFactory();
    const post = await postFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: HIDE_POST,
      variables: {
        postId: post._id,
      },
      token: user.token,
    });
    expect(res.body.hiddenPosts[0].toString()).toBe(post._id.toString());
  });
});
