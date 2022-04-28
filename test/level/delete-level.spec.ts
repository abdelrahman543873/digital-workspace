import { LEVEL } from '../endpoints/level.endpoints';
import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { levelFactory } from '../../src/level/level.factory';
describe('delete level case', () => {
  it('should delete level', async () => {
    const user = await userFactory();
    const level = await levelFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: LEVEL,
      variables: { name: level.name },
      token: user.token,
    });
    expect(res.body.deletedCount).toBe(1);
  });

  it("shouldn't delete level if it has users", async () => {
    const level = await levelFactory();
    const user = await userFactory({ level: level._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: LEVEL,
      variables: { name: level.name },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(615);
  });
});
