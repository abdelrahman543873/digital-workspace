import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { JOINED_GROUPS } from '../endpoints/group.endpoints';
import { groupFactory } from '../../src/group/group.factory';
describe('get joined groups suite case', () => {
  it('should get joined groups', async () => {
    const user = await userFactory();
    await groupFactory({ members: [user._id] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: JOINED_GROUPS,
      token: user.token,
    });
    expect(res.body.docs[0].members[0]._id.toString()).toContain(
      user._id.toString(),
    );
  });

  it('should get joined groups with id', async () => {
    const user = await userFactory();
    await groupFactory({ members: [user._id] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${JOINED_GROUPS}?userId=${user._id}`,
      token: user.token,
    });
    expect(res.body.docs[0].members[0]._id.toString()).toContain(
      user._id.toString(),
    );
  });
});
