import { CacheModule, Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { ConfigService } from '@nestjs/config';
import { ENV_VARIABLE_NAMES } from '../app.const';
import { HttpModule } from '@nestjs/axios';
import { CurrencyRepository } from './currency.repository';

@Module({
  imports: [
    CacheModule.register({ ttl: 0 }),
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>(ENV_VARIABLE_NAMES.CURRENCY_API),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CurrencyService, CurrencyRepository],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
