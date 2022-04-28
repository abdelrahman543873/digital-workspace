import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';
import { GetCurrencyInput } from './inputs/get-currency.input';
import { ActiveUserGuard } from '../shared/guards/active-user.guard';

@UseGuards(ActiveUserGuard)
@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @ApiTags('currency')
  @Get('conversions')
  async getConversions(@Query() input: GetCurrencyInput) {
    return await this.currencyService.getConversions(input);
  }

  @ApiTags('currency')
  @Get('currencies')
  async getCurrencies() {
    return await this.currencyService.getCurrencies();
  }
}
