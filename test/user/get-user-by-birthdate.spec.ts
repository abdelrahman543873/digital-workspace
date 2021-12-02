import { GET_USER_BY_BIRTH_DATE } from './../endpoints/user.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
describe('get user by birthDate suite case', () => {
  it('should get user by birthDate if no birthDate is provided', async () => {
    const user = await userFactory({ birthDate: new Date().toISOString() });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: GET_USER_BY_BIRTH_DATE,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(user._id.toString());
  });

  it('should get user by birthDate if birthDate is provided', async () => {
    const user = await userFactory({
      birthDate: new Date('2020-11-01T16:39:38.831Z').toISOString(),
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_USER_BY_BIRTH_DATE}?date=${new Date(
        '2020-11-01T16:39:38.831Z',
      ).toISOString()}`,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(user._id.toString());
  });

  it("shouldn't get user by birthDate if birthDate doesn't match", async () => {
    const user = await userFactory({
      birthDate: new Date('2020-11-02T16:39:38.831Z').toISOString(),
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_USER_BY_BIRTH_DATE}?date=${new Date(
        '2020-11-09T16:39:38.831Z',
      ).toISOString()}`,
      token: user.token,
    });
    expect(res.body.totalDocs).toBe(0);
  });
});
