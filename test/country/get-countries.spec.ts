import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { COUNTRY } from '../endpoints/country.endpoints';
import { countryFactory } from '../../src/country/country.factory';
describe('get countries suite case', () => {
  it('should get countries', async () => {
    const country = await countryFactory();
    // another country to make sure it's count is zero
    await countryFactory();
    const user = await userFactory({ country: country._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: COUNTRY,
      token: user.token,
    });
    expect(res.body.docs[0].members).toBe(1);
  });
});
