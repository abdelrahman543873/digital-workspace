import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { UPDATE_USER } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
describe('update user case', () => {
  it('should update user cover pic', async () => {
    const user = await userFactory();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER,
      token: user.token,
      filePath,
      fileParam: 'coverPic',
    });
    expect(user.coverPic).not.toBe(res.body.coverPic);
  });

  it('should update user username', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER,
      token: user.token,
      variables: {
        fullName: 'something',
      },
    });
    expect(res.body.fullName).toBe('something');
  });
});
