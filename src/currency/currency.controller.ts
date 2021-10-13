import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @ApiTags('currency')
  @Get('conversions')
  async getConversions() {
    return await this.currencyService.getConversions();
  }
}
