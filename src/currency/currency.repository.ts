import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetCurrencyInput } from './inputs/get-currency.input';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';

@Injectable()
export class CurrencyRepository {
  constructor(
    private httpsService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getConversions(input: GetCurrencyInput) {
    const conversions = await this.cacheManager.get('conversions');
    let response;
    if (!conversions) {
      response = await firstValueFrom(
        this.httpsService.get(
          `/latest?access_key=${process.env.CURRENCY_API_KEY}`,
        ),
      );
      await this.cacheManager.set('conversions', response);
    } else response = conversions;
    await this.cacheManager.set('currencies', Object.keys(response.data.rates));
    const base = response.data.rates[input.base];
    return await Object.keys(response.data.rates).map((currency) => {
      return {
        country: currency,
        conversionRate: parseInt(
          `${input.amount * (response.data.rates[currency] / base)}`,
        ),
      };
    });
  }

  async getCurrencies() {
    const currencies = await this.cacheManager.get('currencies');
    if (!currencies) {
      const response = await firstValueFrom(
        this.httpsService.get(
          `/latest?access_key=${process.env.CURRENCY_API_KEY}`,
        ),
      );
      return await this.cacheManager.set(
        'currencies',
        Object.keys(response.data.rates),
      );
    }
    return currencies;
  }
}
