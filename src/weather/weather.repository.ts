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
        `/onecall?lat=${input.lat}&lon=${input.long}&exclude=current,minutely,hourly,alerts&appid=${process.env.WEATHER_API_KEY}&units=metric`,
      ),
    );
    return response.data.daily.map((forecast) => {
      return {
        temperature: forecast.temp.max,
        windSpeed: forecast.wind_speed,
      };
    });
  }
}
