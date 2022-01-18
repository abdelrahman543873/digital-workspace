import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { FOLLOW_USER } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
import { UserRepo } from './user-test-repo';
import { postFactory } from '../../src/post/post.factory';
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
    const updatedFollowedUser = await UserRepo().findOne({
      _id: followed._id,
    });
    expect(updatedFollowedUser.followers[0].toString()).toBe(
      follower._id.toString(),
    );
  });

  it('should follow and follow back', async () => {
    const follower = await userFactory();
    const followed = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: FOLLOW_USER,
      variables: { userId: followed._id },
      token: follower.token,
    });
    expect(res.body.following[0]).toBe(followed._id.toString());
    const updatedFollowedUser = await UserRepo().findOne({
      _id: followed._id,
    });
    expect(updatedFollowedUser.followers[0].toString()).toBe(
      follower._id.toString(),
    );
    const res2 = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: FOLLOW_USER,
      variables: { userId: follower._id },
      token: followed.token,
    });
    expect(res2.body.following[0].toString()).toContain(
      follower._id.toString(),
    );
  });

  it('should follow a user that has posts', async () => {
    const follower = await userFactory();
    const followed = await userFactory();
    const post = await postFactory({ userId: followed._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: FOLLOW_USER,
      variables: { userId: followed._id },
      token: follower.token,
    });
    expect(res.body.following[0]).toBe(followed._id.toString());
    const updatedFollowedUser = await UserRepo().findOne({
      _id: followed._id,
    });
    expect(updatedFollowedUser.followers[0].toString()).toBe(
      follower._id.toString(),
    );
  });

  it('should throw error if user follows himself', async () => {
    const follower = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: FOLLOW_USER,
      variables: { userId: follower._id },
      token: follower.token,
    });
    expect(res.body.statusCode).toBe(606);
  });

  it("should throw error if user doesn't exist", async () => {
    const follower = await userFactory();
    const randomId = (await postFactory())._id;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: FOLLOW_USER,
      variables: { userId: randomId.toString() },
      token: follower.token,
    });
    expect(res.body.statusCode).toBe(602);
  });
});
