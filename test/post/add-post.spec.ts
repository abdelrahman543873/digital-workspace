import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { ADD_POST } from '../endpoints/post.endpoints';
import { buildPostParams } from '../../src/post/post.factory';
describe('add post suite case', () => {
  it('add post', async () => {
    const postParams = await buildPostParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_POST,
      variables: {
        content: postParams.content,
      },
    });
    expect(res.body.content).toBe(postParams.content);
  });
});
