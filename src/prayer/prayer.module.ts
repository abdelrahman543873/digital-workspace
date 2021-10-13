import { ENV_VARIABLE_NAMES } from './../app.const';
import { Module } from '@nestjs/common';
import { PrayerService } from './prayer.service';
import { PrayerController } from './prayer.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrayerRepository } from './prayer.repository';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>(ENV_VARIABLE_NAMES.PRAYER_API),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [PrayerService, PrayerRepository],
  controllers: [PrayerController],
})
export class PrayerModule {}
