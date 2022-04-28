import { TEAM_LIST } from './../endpoints/team.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { teamFactory } from '../../src/team/team.factory';
describe('get team list suite case', () => {
  it('should team list', async () => {
    const user = await userFactory();
    const team = await teamFactory({ members: [user._id] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: TEAM_LIST,
      token: user.token,
    });
    expect(res.body.docs[0].membersCount).toBe(1);
  });
});
