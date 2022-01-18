import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { SEARCH_USER } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
describe('search user suite case', () => {
  it('should search user by email', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_USER}?keyword=${user.email}`,
      token: user.token,
    });
    expect(Object.keys(res.body.docs[0].directManager).length).toBe(0);
    expect(res.body.docs[0]._id.toString()).toBe(user._id.toString());
  });

  it('should search user by email and get direct manager', async () => {
    const manager = await userFactory();
    const user = await userFactory({
      directManagerId: manager._id,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_USER}?keyword=${user.email}`,
      token: user.token,
    });
    expect(res.body.docs[0].directManager._id.toString()).toBe(
      manager._id.toString(),
    );
    expect(res.body.docs[0]._id.toString()).toBe(user._id.toString());
  });

  it('should search user by username', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_USER}?keyword=${user.fullName}`,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(user._id.toString());
  });

  it('should search user by username inexact', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_USER}?keyword=${user.fullName.substr(3)}`,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(user._id.toString());
  });

  it("shouldn't return company users", async () => {
    const user = await userFactory({ isCompany: true });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_USER}?keyword=${user.fullName}`,
      token: user.token,
    });
    expect(
      res.body.docs.map((doc) => {
        return doc._id.toString();
      }),
    ).not.toContain(user._id.toString());
  });
});
