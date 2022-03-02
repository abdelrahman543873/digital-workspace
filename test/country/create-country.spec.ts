import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildCountryParams } from '../../src/country/country.factory';
import { COUNTRY } from '../endpoints/country.endpoints';
describe('create country  suite case', () => {
  it("should create country and upload it's picture", async () => {
    const user = await userFactory();
    const country = buildCountryParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: COUNTRY,
      variables: {
        name: country.name,
      },
      filePath,
      fileParam: 'logo',
      token: user.token,
    });
    expect(res.body.logo).toContain('.jpeg');
  });
});
