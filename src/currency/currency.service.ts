import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from './currency.repository';

@Injectable()
export class CurrencyService {
  constructor(private currencyRepo: CurrencyRepository) {}
  async getConversions() {
    return await this.currencyRepo.getConversions();
  }
}
