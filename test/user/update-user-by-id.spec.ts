import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { UPDATE_USER_BY_ID } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
import { postFactory } from '../../src/post/post.factory';
describe('update user by id case', () => {
  it('should update user cover pic', async () => {
    const user = await userFactory();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER_BY_ID,
      token: user.token,
      variables: { userId: user._id.toString() },
      filePath,
      fileParam: 'coverPic',
    });
    expect(user.coverPic).not.toBe(res.body.coverPic);
  });

  it('should update user username', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER_BY_ID,
      token: user.token,
      variables: {
        userId: user._id.toString(),
        fullName: 'something',
      },
    });
    expect(res.body.fullName).toBe('something');
  });

  it('should update user isCompany', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER_BY_ID,
      token: user.token,
      variables: {
        userId: user._id.toString(),
        isCompany: 'true',
      },
    });
    expect(res.body.isCompany).toBe(true);
  });

  it("should throw error if manager id doesn't exist", async () => {
    const user = await userFactory();
    const randomId = (await postFactory())._id;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER_BY_ID,
      token: user.token,
      variables: {
        userId: user._id.toString(),
        directManagerId: randomId.toString(),
      },
    });
    expect(res.body.statusCode).toBe(608);
  });

  it('should update user direct manager', async () => {
    const user = await userFactory();
    const managed = await userFactory();
    const manager = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_USER_BY_ID,
      token: user.token,
      variables: {
        userId: managed._id.toString(),
        directManagerId: manager._id.toString(),
      },
    });
    expect(res.body.directManagerId.toString()).toBe(manager._id.toString());
  });
});
