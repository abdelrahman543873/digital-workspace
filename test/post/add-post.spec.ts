import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { ADD_POST } from '../endpoints/post.endpoints';
import { buildPostParams } from '../../src/post/post.factory';
import { userFactory } from '../../src/user/user.factory';
describe('add post suite case', () => {
  it('should add post', async () => {
    const user = await userFactory();
    const postParams = await buildPostParams({ userId: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_POST,
      variables: {
        content: postParams.content,
      },
      token: user.token,
    });
    expect(res.body.userId).toBe(user._id.toString());
    expect(res.body.content).toBe(postParams.content);
  });
});
