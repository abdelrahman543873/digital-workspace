import { TEAM } from './../endpoints/team.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { buildTeamParams } from '../../src/team/team.factory';
describe('create team suite case', () => {
  it('should create team', async () => {
    const user = await userFactory();
    const team = await buildTeamParams({ admin: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: TEAM,
      variables: {
        name: team.name,
        description: team.description,
      },
      token: user.token,
    });
    expect(res.body.name).toBe(team.name);
  });
});
