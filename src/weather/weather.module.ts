import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherRepository } from './weather.repository';
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('WEATHER_API'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [WeatherService, WeatherRepository],
  controllers: [WeatherController],
})
export class WeatherModule {}
