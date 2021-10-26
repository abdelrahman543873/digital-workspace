import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from './currency.repository';
import { GetCurrencyInput } from './inputs/get-currency.input';

@Injectable()
export class CurrencyService {
  constructor(private currencyRepo: CurrencyRepository) {}
  async getConversions(input: GetCurrencyInput) {
    return await this.currencyRepo.getConversions(input);
  }
}
