import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyRepository {
  constructor(private httpsService: HttpService) {}

  async getConversions() {
    const response = await firstValueFrom(
      this.httpsService.get(
        `/latest?access_key=${process.env.CURRENCY_API_KEY}`,
      ),
    );
    return await response.data;
  }
}
