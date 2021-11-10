import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { MANAGE_JOIN_GROUP } from '../endpoints/group.endpoints';
import { groupFactory } from '../../src/group/group.factory';
describe('manage join suite case', () => {
  it('should join group', async () => {
    const user = await userFactory();
    const group = await groupFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_JOIN_GROUP,
      variables: {
        groupId: group._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.members[1]).toBe(user._id.toString());
  });

  it('should join group and leave group', async () => {
    const user = await userFactory();
    const group = await groupFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_JOIN_GROUP,
      variables: {
        groupId: group._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.members[1]).toBe(user._id.toString());
    const res1 = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_JOIN_GROUP,
      variables: {
        groupId: group._id.toString(),
      },
      token: user.token,
    });
    expect(res1.body.members).not.toContain(user._id.toString());
  });
});
