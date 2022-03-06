import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import {
  countryFactory,
  buildCountryParams,
} from '../../src/country/country.factory';
import { COUNTRY } from '../endpoints/country.endpoints';
describe('update country suite case', () => {
  it("should update country upload it's picture", async () => {
    const user = await userFactory();
    await countryFactory();
    const params = await buildCountryParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: COUNTRY,
      variables: {
        name: params.name,
      },
      filePath,
      fileParam: 'logo',
      token: user.token,
    });
    expect(res.body.logo).toContain('.jpeg');
    expect(res.body.name).toBe(params.name);
  });
});
