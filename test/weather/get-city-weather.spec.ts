import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { GET_WEATHER } from '../endpoints/weather.endpoints';
import { DAY_NAMES } from '../../src/app.const';
describe('get weather suite case', () => {
  it('get weather', async () => {
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_WEATHER}/25.7999/30.4964`,
    });
    expect(res.body.length).toBe(8);
    expect(res.body[0].day).toBe(DAY_NAMES[new Date().getDay()]);
    expect(res.body[0]).toHaveProperty('temperature');
  });
});
