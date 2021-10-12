import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { ADD_POST } from '../endpoints/post.endpoints';
describe('add post suite case', () => {
  it('add post', async () => {
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_POST,
      variables: {
        content: 'hello',
      },
    });
    expect(res.body.content).toBe('hello');
  });
});
