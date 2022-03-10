import { LEVEL } from '../endpoints/level.endpoints';
import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { levelFactory } from '../../src/level/level.factory';
describe('get levels case', () => {
  it('should get levels', async () => {
    const level = await levelFactory();
    const user = await userFactory({ level: level._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: LEVEL,
      token: user.token,
    });
    expect(+res.body.docs[0].members).toBe(1);
  });
});
