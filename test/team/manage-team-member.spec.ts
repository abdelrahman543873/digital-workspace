import { MANAGE_TEAM_MEMBER } from './../endpoints/team.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { teamFactory } from '../../src/team/team.factory';
describe('manage team member suite case', () => {
  it('should manage team member', async () => {
    const user = await userFactory();
    const team = await teamFactory({ admin: user._id });
    const member = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: MANAGE_TEAM_MEMBER,
      variables: {
        memberId: member._id,
        teamId: team._id,
      },
      token: user.token,
    });
    expect(res.body.members.length).toBe(2);
  });

  it('should remove team member if exists', async () => {
    const user = await userFactory();
    const team = await teamFactory({ admin: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: MANAGE_TEAM_MEMBER,
      variables: {
        memberId: team.members[0],
        teamId: team._id,
      },
      token: user.token,
    });
    expect(res.body.members.length).toBe(0);
  });
});
