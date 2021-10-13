import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { WeatherRepository } from './weather.repository';
import { GetWeatherInput } from './inputs/get-city-weather.input';

@Injectable()
export class WeatherService {
  constructor(private weatherRepository: WeatherRepository) {}

  async getWeatherByCity(input: GetWeatherInput) {
    return await this.weatherRepository.getCityWeather(input);
  }
}
