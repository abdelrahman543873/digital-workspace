import { GET_MY_TEAMS } from './../endpoints/team.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { teamFactory } from '../../src/team/team.factory';
describe('get my teams suite case', () => {
  it('should get my teams', async () => {
    const user = await userFactory();
    const team = await teamFactory({ members: [user._id] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_MY_TEAMS,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(team._id.toString());
  });

  it('should get teams i am admin in', async () => {
    const user = await userFactory();
    const team = await teamFactory({ admin: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_MY_TEAMS,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(team._id.toString());
  });
});
