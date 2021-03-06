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
    const idsArray = [];
    res.body.docs.forEach((user) => {
      if (user?.title?._id) idsArray.push(user.title._id);
      if (user?.team?._id) idsArray.push(user.team._id);
      if (user?.role?._id) idsArray.push(user.role._id);
    });
    expect(idsArray.includes(user.role.toString())).toBe(true);
    expect(idsArray.includes(user.title.toString())).toBe(true);
    expect(idsArray.includes(user.team.toString())).toBe(true);
    expect(res.body.totalDocs).toBeGreaterThanOrEqual(1);
  });

  it('should get user list filtered by status', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_USER_LIST}?status=${user.status}`,
      token: user.token,
    });
    expect(
      res.body.docs.filter((userEl) => {
        if (userEl.status !== user.status) return userEl;
      }).length,
    ).toBe(0);
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
    const idsArray = [];
    res.body.docs.forEach((user) => {
      if (user?.title?._id) idsArray.push(user.title._id);
    });
    expect(idsArray.includes(params.title.toString())).toBe(true);
    expect(res.body.totalDocs).toBeGreaterThanOrEqual(1);
  });
});
