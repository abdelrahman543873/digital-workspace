import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { SEARCH_COUNTRY } from '../endpoints/country.endpoints';
import { countryFactory } from '../../src/country/country.factory';
describe('search countries suite case', () => {
  it('should search countries', async () => {
    const country = await countryFactory();
    // another country to make sure the right one is searched for
    await countryFactory();
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_COUNTRY}/${country.name.substring(0, 2)}`,
      token: user.token,
    });
    expect(res.body.docs[0].name).toContain(country.name.substring(0, 2));
  });
});
