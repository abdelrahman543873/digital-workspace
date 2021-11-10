import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { CREATE_GROUP } from '../endpoints/group.endpoints';
import { buildGroupParams } from '../../src/group/group.factory';
describe('create page suite case', () => {
  it('should create page', async () => {
    const user = await userFactory();
    const group = await buildGroupParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CREATE_GROUP,
      variables: {
        name: group.name,
      },
      token: user.token,
    });
    expect(res.body.name).toBe(group.name);
  });
});
