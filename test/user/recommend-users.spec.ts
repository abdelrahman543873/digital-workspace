import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { RECOMMEND_USERS } from '../endpoints/user.endpoints';
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
});
