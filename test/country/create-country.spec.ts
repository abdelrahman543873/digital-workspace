import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildCountryParams } from '../../src/country/country.factory';
import { COUNTRY } from '../endpoints/country.endpoints';
import { random } from 'faker';
describe('create country  suite case', () => {
  it('should create country', async () => {
    const user = await userFactory();
    const country = buildCountryParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: COUNTRY,
      variables: {
        name: country.name,
      },
      token: user.token,
    });
    expect(res.body.name).toBe(country.name);
  });

  it("shouldn't allow an invalid country name", async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: COUNTRY,
      variables: {
        name: random.word(),
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
