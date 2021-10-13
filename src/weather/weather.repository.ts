import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GetWeatherInput } from './inputs/get-city-weather.input';

@Injectable()
export class WeatherRepository {
  constructor(private httpService: HttpService) {}

  async getCityWeather(input: GetWeatherInput) {
    return await this.httpService.get(
      `data/2.5/weather?q=${input.city}&appid=${process.env.WEATHER_API_KEY}`,
    );
  }
}
