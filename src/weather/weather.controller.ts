import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WeatherService } from './weather.service';
import { GetWeatherInput } from './inputs/get-city-weather.input';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}
  @ApiTags('weather')
  @Get(':city')
  async getCityWeather(@Param() input: GetWeatherInput) {
    return await this.weatherService.getWeatherByCity(input);
  }
}
