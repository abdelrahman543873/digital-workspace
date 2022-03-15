import { LEVEL } from '../endpoints/level.endpoints';
import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildLevelParams } from '../../src/level/level.factory';
describe('create level case', () => {
  it('should create level', async () => {
    const user = await userFactory();
    const level = buildLevelParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LEVEL,
      variables: level,
      token: user.token,
    });
    expect(res.body.name).toBe(level.name);
  });
});
