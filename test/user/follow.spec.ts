import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { FOLLOW_USER } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
import { UserRepo } from './user-test-repo';
describe('follow user suite case', () => {
  it('should follow user successfully', async () => {
    const follower = await userFactory();
    const followed = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: FOLLOW_USER,
      variables: { userId: followed._id },
      token: follower.token,
    });
    expect(res.body.following[0]).toBe(followed._id.toString());
    const updatedFollowedUser = await (
      await UserRepo()
    ).findOne({
      _id: followed._id,
    });
    expect(updatedFollowedUser.followers[0].toString()).toBe(
      follower._id.toString(),
    );
  });
});
