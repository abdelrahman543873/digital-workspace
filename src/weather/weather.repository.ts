import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GetWeatherInput } from './inputs/get-city-weather.input';

@Injectable()
export class WeatherRepository {
  constructor(private httpService: HttpService) {}

  async getCityWeather(input: GetWeatherInput) {
    const response = await firstValueFrom(
      this.httpService.get(
        `/weather?q=${input.city}&appid=${process.env.WEATHER_API_KEY}`,
      ),
    );
    return response.data;
  }
}
