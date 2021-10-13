import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherRepository } from './weather.repository';
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { ConfigService } from '@nestjs/config';
import { ENV_VARIABLE_NAMES } from '../app.const';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>(ENV_VARIABLE_NAMES.WEATHER_API),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [WeatherService, WeatherRepository],
  controllers: [WeatherController],
})
export class WeatherModule {}
