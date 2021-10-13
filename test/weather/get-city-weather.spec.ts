import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { GET_WEATHER } from '../endpoints/weather.endpoints';
describe('get weather suite case', () => {
  it('get weather', async () => {
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_WEATHER}/Cairo`,
    });
    expect(res.body).toHaveProperty('coord');
    expect(res.body).toHaveProperty('weather');
  });
});
