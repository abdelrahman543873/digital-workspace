import { REPORT_POST } from './../endpoints/post.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { postFactory } from '../../src/post/post.factory';
import { userFactory } from '../../src/user/user.factory';
describe('report post suite case', () => {
  it('should report post', async () => {
    const user = await userFactory();
    const post = await postFactory({
      userId: user._id,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: REPORT_POST,
      token: user.token,
      variables: { postId: post._id, reason: post.content },
    });
    expect(res.body.reports.length).toBe(2);
  });
});
