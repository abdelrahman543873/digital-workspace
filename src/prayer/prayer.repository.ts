import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GetPrayerTimesInput } from './inputs/get-prayer-times.input';

@Injectable()
export class PrayerRepository {
  constructor(private httpService: HttpService) {}
  async getPrayerTimes(input: GetPrayerTimesInput) {
    const response = await firstValueFrom(
      this.httpService.get(`/today.json?city=${input.city}`),
    );
    return response.data;
  }
}
