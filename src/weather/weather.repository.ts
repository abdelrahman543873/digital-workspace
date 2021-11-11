import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GetWeatherInput } from './inputs/get-city-weather.input';
import { DAY_NAMES } from '../app.const';

@Injectable()
export class WeatherRepository {
  constructor(private httpService: HttpService) {}

  async getCityWeather(input: GetWeatherInput) {
    const response = await firstValueFrom(
      this.httpService.get(
        `/onecall?lat=${input.lat}&lon=${input.long}&exclude=current,minutely,hourly,alerts&appid=${process.env.WEATHER_API_KEY}&units=metric`,
      ),
    );
    return response.data.daily.map((forecast, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const formattedForecast = {
        day: DAY_NAMES[date.getUTCDay()],
        temperature: forecast.temp.max,
        windSpeed: forecast.wind_speed,
        location: response.data.timezone,
      };
      return formattedForecast;
    });
  }
}
