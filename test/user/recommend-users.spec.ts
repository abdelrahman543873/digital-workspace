import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { RECOMMEND_USERS } from '../endpoints/user.endpoints';
import { UserRepo } from './user-test-repo';
describe('recommend users suite case', () => {
  it('should recommend users', async () => {
    const user = await userFactory({ following: [(await userFactory())._id] });
    const hello = await userFactory();
    const followedByFollowed = await userFactory({
      followers: [user.following[0], hello._id],
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: RECOMMEND_USERS,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(
      followedByFollowed._id.toString(),
    );
  });

  it('should recommend users', async () => {
    const followed = await userFactory();
    const follower = await userFactory({ following: [followed._id] });
    // updating followed user followers to have the follower id
    await UserRepo().updateOne(
      { _id: followed._id },
      { followers: [follower._id] },
    );
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: RECOMMEND_USERS,
      token: follower.token,
    });
    expect(res.body.totalDocs).toBe(0);
  });

  it("shouldn't recommend users where user is already followed", async () => {
    const user = await userFactory({ following: [(await userFactory())._id] });
    await userFactory({
      followers: [user.following[0], user._id],
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: RECOMMEND_USERS,
      token: user.token,
    });
    expect(res.body.totalDocs).toBe(0);
  });

  it("shouldn't recommend users where one user is present", async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: RECOMMEND_USERS,
      token: user.token,
    });
    expect(res.body.totalDocs).toBe(0);
  });
});
