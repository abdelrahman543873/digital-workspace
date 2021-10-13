import { GET_PRAYER } from './../endpoints/prayer.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
describe('get weather suite case', () => {
  it('get weather', async () => {
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_PRAYER}/cairo`,
    });
    expect(res.body.results).toHaveProperty('datetime');
  });
});
