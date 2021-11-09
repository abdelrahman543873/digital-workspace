import { REMOVE_POST } from './../endpoints/post.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { postFactory } from '../../src/post/post.factory';
import { userFactory } from '../../src/user/user.factory';
describe('remove post suite case', () => {
  it('should remove post', async () => {
    const user = await userFactory();
    const post = await postFactory({
      userId: user._id,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: `${REMOVE_POST}/${post._id.toString()}`,
      token: user.token,
    });
    expect(res.body.deletedCount).toBe(1);
  });

  it("shouldn't remove post", async () => {
    const user = await userFactory();
    await postFactory({
      userId: user._id,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: `${REMOVE_POST}/${user._id.toString()}`,
      token: user.token,
    });
    expect(res.body.deletedCount).toBe(0);
  });
});
