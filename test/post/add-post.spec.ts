import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { ADD_POST } from '../endpoints/post.endpoints';
import { buildPostParams } from '../../src/post/post.factory';
import { userFactory } from '../../src/user/user.factory';
describe('add post suite case', () => {
  it('should add post and upload attachment', async () => {
    const user = await userFactory();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const postParams = await buildPostParams({ userId: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_POST,
      variables: {
        content: postParams.content,
      },
      token: user.token,
      filePath,
      fileParam: 'attachments',
    });
    expect(res.body.attachments.length).toBe(1);
    expect(res.body.userId).toBe(user._id.toString());
    expect(res.body.content).toBe(postParams.content);
  });

  it('should add post without upload attachment', async () => {
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
