import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { LOAD_USER } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
import { UserRepo } from './user-test-repo';
describe('load user suite case', () => {
  it('should load user', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LOAD_USER,
      token: user.token,
    });
    expect(res.body.length).toBeGreaterThan(1);
    await UserRepo().rawDelete();
  });

  it("shouldn't override users data when pulling sheet", async () => {
    const followedUser = await userFactory();
    const user = await userFactory({
      email: 'abdlerahmanm@blackstoneeit.com',
      following: [followedUser._id],
      twitter: 'something',
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LOAD_USER,
      token: user.token,
    });
    expect(res.body.length).toBeGreaterThan(1);
    expect(
      (await UserRepo().findOne({ email: 'abdlerahmanm@blackstoneeit.com' }))
        .following.length,
    ).toBe(1);
    expect(
      (await UserRepo().findOne({ email: 'abdlerahmanm@blackstoneeit.com' }))
        .twitter,
    ).toBe('something');
  });
});
