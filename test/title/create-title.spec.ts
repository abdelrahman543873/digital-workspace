import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildTitleParams, titleFactory } from '../../src/title/title.factory';
import { TITLE } from '../endpoints/title.endpoints';
describe('create title case', () => {
  it('should create title', async () => {
    const user = await userFactory();
    const title = await buildTitleParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: TITLE,
      variables: { ...title, department: title.department.toString() },
      token: user.token,
    });
    expect(res.body.name).toBe(title.name);
  });

  it('should throw error when title already exists', async () => {
    const user = await userFactory();
    const titleType = await titleFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: TITLE,
      variables: {
        name: titleType.name,
        description: titleType.description,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
