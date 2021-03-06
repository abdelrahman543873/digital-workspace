import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { UPDATE_USER } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
import { postFactory } from '../../src/post/post.factory';
import { buildUserParams } from '../../src/user/user.seed';
import { random } from 'faker';
import { WIDGETS } from '../../src/app.const';
describe('update user case', () => {
  it('should update user cover pic and his widgets', async () => {
    const user = await userFactory();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const widgets = random.arrayElements(WIDGETS);
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER,
      token: user.token,
      variables: { widgets },
      filePath,
      fileParam: 'coverPic',
    });
    expect(res.body.widgets).toEqual(widgets);
    expect(user.coverPic).not.toBe(res.body.coverPic);
  });

  it('should throw error when user enters password only', async () => {
    const params = await buildUserParams();
    const user = await userFactory(params);
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER,
      token: user.token,
      variables: { password: params.password },
      filePath,
      fileParam: 'coverPic',
    });
    expect(res.body.statusCode).toBe(400);
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

  it("should throw error if manager id doesn't exist", async () => {
    const user = await userFactory();
    const randomId = (await postFactory())._id;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER,
      token: user.token,
      variables: {
        directManagerId: randomId.toString(),
      },
    });
    expect(res.body.statusCode).toBe(400);
  });

  it('should throw error if manager id equal to employee id', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER,
      token: user.token,
      variables: {
        directManagerId: user._id.toString(),
      },
    });
    expect(res.body.statusCode).toBe(400);
  });

  it('should be able to change password', async () => {
    const params = await buildUserParams();
    const user = await userFactory(params);
    const newPassword = random.words(5);
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER,
      token: user.token,
      variables: {
        password: params.password,
        newPassword,
      },
    });
    expect(res.body.email).toBe(user.email);
  });

  it('should throw password if original password is incorrect', async () => {
    const params = await buildUserParams();
    const user = await userFactory(params);
    const newPassword = random.words(5);
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER,
      token: user.token,
      variables: {
        password: random.words(5),
        newPassword,
      },
    });
    expect(res.body.statusCode).toBe(400);
  });

  it('should throw error if new password only', async () => {
    const params = await buildUserParams();
    const user = await userFactory(params);
    const newPassword = random.words(5);
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER,
      token: user.token,
      variables: {
        newPassword,
      },
    });
    expect(res.body.statusCode).toBe(400);
  });
});
