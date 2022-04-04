import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { titleFactory } from '../../src/title/title.factory';
import { TITLES_LIST } from '../endpoints/title.endpoints';
describe('get title list case', () => {
  it('should get titles list', async () => {
    const title = await titleFactory();
    const user = await userFactory({ title: title._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: TITLES_LIST,
      token: user.token,
    });
    expect(Object.keys(res.body.docs[0].department).length).toBeGreaterThan(0);
    expect(res.body.docs[0].members).toBe(1);
  });
});
