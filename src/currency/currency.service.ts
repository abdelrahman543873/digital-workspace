import { Inject, Injectable } from '@nestjs/common';
import { CurrencyRepository } from './currency.repository';
import { GetCurrencyInput } from './inputs/get-currency.input';
import { BaseHttpException } from '../shared/exceptions/base-http-exception';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';

@Injectable()
export class CurrencyService {
  constructor(
    private currencyRepo: CurrencyRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}
  async getConversions(input: GetCurrencyInput) {
    const currencies = await this.getCurrencies();
    if (!currencies.includes(input.base))
      throw new BaseHttpException(this.request.lang, 604);
    return await this.currencyRepo.getConversions(input);
  }

  async getCurrencies(): Promise<Array<string>> {
    return await this.currencyRepo.getCurrencies();
  }
}
