import { IsString } from 'class-validator';
export class GetWeatherInput {
  @IsString()
  city: string;
}
