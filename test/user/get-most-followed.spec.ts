import { MOST_FOLLOWED } from './../endpoints/user.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
describe('get users by most followed suite case', () => {
  it('should get users by most followed', async () => {
    const firstUser = await userFactory();
    const mostFollowed = await userFactory({
      followers: [firstUser._id, firstUser._id],
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: MOST_FOLLOWED,
      token: firstUser.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(mostFollowed._id.toString());
  });

  it("shouldn't get user if company", async () => {
    const firstUser = await userFactory();
    const mostFollowed = await userFactory({
      followers: [firstUser._id, firstUser._id],
      isCompany: true,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: MOST_FOLLOWED,
      token: firstUser.token,
    });
    expect(
      res.body.docs.map((doc) => {
        return doc._id.toString();
      }),
    ).not.toContain(mostFollowed._id.toString());
  });
});
