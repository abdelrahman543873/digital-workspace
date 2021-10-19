import { IsLatitude, IsLongitude } from 'class-validator';
export class GetWeatherInput {
  @IsLatitude()
  lat: number;

  @IsLongitude()
  long: number;
}
