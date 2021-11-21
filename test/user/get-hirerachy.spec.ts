import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { GET_HIERARCHY } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
import { Types } from 'mongoose';
describe('get hierarchy suite case', () => {
  it('should get hierarchy', async () => {
    const manager = await userFactory();
    const lowerManager = await userFactory({
      directManagerId: new Types.ObjectId(manager._id.toString()),
    });
    const subordinate = await userFactory({
      directManagerId: new Types.ObjectId(lowerManager._id.toString()),
    });
    await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_HIERARCHY,
      token: lowerManager.token,
    });
    expect(res.body.subordinates.length).toBe(1);
    expect(res.body.subordinates[0]._id).toBe(subordinate._id.toString());
    expect(res.body.manager._id.toString()).toBe(manager._id.toString());
  });
});
