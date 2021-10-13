import { IsString } from 'class-validator';
export class GetPrayerTimesInput {
  @IsString()
  city: string;
}
