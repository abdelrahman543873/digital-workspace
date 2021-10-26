import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetCurrencyInput } from './inputs/get-currency.input';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyRepository {
  constructor(private httpsService: HttpService) {}

  async getConversions(input: GetCurrencyInput) {
    const response = await firstValueFrom(
      this.httpsService.get(
        `/latest?access_key=${process.env.CURRENCY_API_KEY}`,
      ),
    );
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
}
