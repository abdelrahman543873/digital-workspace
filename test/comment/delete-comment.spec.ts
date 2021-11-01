import { postFactory } from './../../src/post/post.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { DELETE_COMMENT } from '../endpoints/comment.endpoints';
import { commentFactory } from '../../src/comment/comment.factory';
describe('delete comment suite case', () => {
  it('should delete comment', async () => {
    const user = await userFactory();
    const comment = await commentFactory({ commenter: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: DELETE_COMMENT,
      variables: {
        commentId: comment._id,
      },
      token: user.token,
    });
    expect(res.body.deletedCount).toBe(1);
  });
});
