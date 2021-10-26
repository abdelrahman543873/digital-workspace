import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { GetCurrencyInput } from './inputs/get-currency.input';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @ApiTags('currency')
  @Get('conversions')
  async getConversions(@Query() input: GetCurrencyInput) {
    return await this.currencyService.getConversions(input);
  }
}
