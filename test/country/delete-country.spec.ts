import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { countryFactory } from '../../src/country/country.factory';
import { COUNTRY } from '../endpoints/country.endpoints';
import { address } from 'faker';
describe('delete country suite case', () => {
  it('should delete country', async () => {
    const user = await userFactory();
    const countryName = address.country();
    await countryFactory({ name: countryName });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: COUNTRY,
      variables: {
        name: countryName,
      },
      token: user.token,
    });
    expect(res.body.deletedCount).toBe(1);
  });
});
