import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { countryFactory } from '../../src/country/country.factory';
import { COUNTRY } from '../endpoints/country.endpoints';
describe('delete country suite case', () => {
  it('should delete country', async () => {
    const user = await userFactory();
    const country = await countryFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: COUNTRY,
      variables: {
        name: country.name,
      },
      token: user.token,
    });
    expect(res.body.deletedCount).toBe(1);
  });
});
