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
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_MY_POSTS,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(post._id.toString());
  });
});
