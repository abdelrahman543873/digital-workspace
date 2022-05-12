import { ADD_USER, GET_USER_LIST } from './../endpoints/user.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { GENDER } from '../../src/app.const';
import { buildUserParams } from '../../src/user/user.seed';
describe('get user list suite case', () => {
  it('should get user list', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_USER_LIST,
      token: user.token,
    });
    expect(
      res.body.docs.map((user) => {
        if (user.team) return user.team._id;
      }),
    ).toContainEqual(user.team);
    expect(
      res.body.docs.map((user) => {
        if (user.title) return user.title._id;
      }),
    ).toContainEqual(user.title);
    expect(res.body.totalDocs).toBeGreaterThanOrEqual(1);
  });

  it('should get user list after adding a user', async () => {
    const params = await buildUserParams();
    const addUserRes = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_USER,
      variables: {
        email: params.email,
        password: params.password,
        status: params.status,
        governmentalId: params.governmentalId,
        phone: params.phone,
        gender: GENDER[0],
        title: params.title.toString(),
      },
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_USER_LIST,
      token: addUserRes.body.token,
    });
    expect(
      res.body.docs.map((user) => {
        if (user.title) return user.title._id;
      }),
    ).toContainEqual(params.title.toString());
    expect(res.body.totalDocs).toBeGreaterThanOrEqual(1);
  });
});
