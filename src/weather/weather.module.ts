import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';
import { WeatherRepository } from './weather.repository';
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';

@Module({
  imports: [HttpModule.register({ baseURL: process.env.WEATHER_API })],
  providers: [WeatherService, WeatherRepository],
  controllers: [WeatherController],
})
export class WeatherModule {}
