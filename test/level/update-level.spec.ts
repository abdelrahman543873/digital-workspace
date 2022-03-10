import { LEVEL } from '../endpoints/level.endpoints';
import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { levelFactory, buildLevelParams } from '../../src/level/level.factory';
describe('update level case', () => {
  it('should update level', async () => {
    const user = await userFactory();
    const level = await levelFactory();
    const params = buildLevelParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: LEVEL,
      variables: {
        id: level._id.toString(),
        name: params.name,
        description: params.description,
      },
      token: user.token,
    });
    expect(res.body.name).toBe(params.name);
    expect(res.body.description).toBe(params.description);
  });
});
