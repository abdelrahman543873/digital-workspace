import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { buildPageParams } from '../../src/page/page.factory';
import { CREATE_PAGE } from '../endpoints/page.endpoints';
describe('create page suite case', () => {
  it('should create page', async () => {
    const user = await userFactory();
    const page = await buildPageParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CREATE_PAGE,
      variables: {
        name: page.name,
      },
      token: user.token,
    });
    expect(res.body.name).toBe(page.name);
  });

  it('should throw error when creating two pages with the same name', async () => {
    const user = await userFactory();
    const page = await buildPageParams();
    await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CREATE_PAGE,
      variables: {
        name: page.name,
      },
      token: user.token,
    });
    const res2 = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CREATE_PAGE,
      variables: {
        name: page.name,
      },
      token: user.token,
    });
    expect(res2.body.statusCode).toBe(418);
  });

  it('should create page with logo', async () => {
    const user = await userFactory();
    const page = await buildPageParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CREATE_PAGE,
      variables: {
        name: page.name,
      },
      token: user.token,
      filePath,
      fileParam: 'logo',
    });
    console.log(res.body);
    expect(res.body.name).toBe(page.name);
    expect(res.body.logo).toContain(process.env.HOST);
  });
});
