import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { MANAGE_LIKE_COMMENT } from '../endpoints/comment.endpoints';
import { commentFactory } from '../../src/comment/comment.factory';
describe('manage like comment suite case', () => {
  it('should like comment', async () => {
    const user = await userFactory();
    const comment = await commentFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LIKE_COMMENT,
      variables: {
        commentId: comment._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.likes.length).toBe(2);
  });

  it('should dislike comment', async () => {
    const user = await userFactory();
    const comment = await commentFactory({ likes: [user._id] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LIKE_COMMENT,
      variables: {
        commentId: comment._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.likes.length).toBe(0);
  });
});
