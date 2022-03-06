import { buildUserParams } from './../../src/user/user.seed';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { ADD_USER } from '../endpoints/user.endpoints';
describe('register user suite case', () => {
  it('should register user and return a token', async () => {
    const params = await buildUserParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_USER,
      variables: {
        email: params.email,
        password: params.password,
      },
    });
    expect(res.body.token).toBeTruthy();
    expect(res.body.email).toBe(params.email.toLowerCase());
  });

  it('should register user that is company and not admin', async () => {
    const params = await buildUserParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_USER,
      variables: {
        email: params.email,
        password: params.password,
        isAdmin: 'false',
        isCompany: 'true',
      },
    });
    expect(res.body.isCompany).toBe(true);
    expect(res.body.isAdmin).toBe(false);
    expect(res.body.token).toBeTruthy();
    expect(res.body.email).toBe(params.email.toLowerCase());
  });

  it('should add user with cover pic', async () => {
    const params = await buildUserParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_USER,
      variables: {
        email: params.email,
        password: params.password,
      },
      filePath,
      fileParam: 'coverPic',
    });
    expect(res.body.coverPic).toContain(process.env.HOST);
    expect(res.body.token).toBeTruthy();
    expect(res.body.email).toBe(params.email.toLowerCase());
  });
});
