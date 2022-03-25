import { TEAM } from './../endpoints/team.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { teamFactory, buildTeamParams } from '../../src/team/team.factory';
describe('create team suite case', () => {
  it('should create team', async () => {
    const user = await userFactory();
    const params = await buildTeamParams();
    const team = await teamFactory({ admin: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: TEAM,
      variables: {
        id: team._id.toString(),
        name: params.name,
        description: team.description,
      },
      token: user.token,
    });
    expect(res.body.name).toBe(params.name);
  });
});
