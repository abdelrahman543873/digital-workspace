import { TEAM } from './../endpoints/team.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { teamFactory } from '../../src/team/team.factory';
describe('delete team suite case', () => {
  it('should delete team', async () => {
    const user = await userFactory();
    const team = await teamFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: TEAM,
      variables: {
        id: team._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.name).toBe(team.name);
  });
});
