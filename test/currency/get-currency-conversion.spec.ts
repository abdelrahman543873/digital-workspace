import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { GET_CURRENCY } from '../endpoints/currency.endpoints';
describe('get currency suite case', () => {
  it('should get currency conversions', async () => {
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${GET_CURRENCY}?base=AED&amount=10`,
    });
    expect(res.body.length).toBeGreaterThan(10);
    expect(res.body[0].conversionRate).toBe(10);
  });
});
