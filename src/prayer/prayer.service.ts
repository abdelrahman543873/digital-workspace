import { Injectable } from '@nestjs/common';
import { PrayerRepository } from './prayer.repository';
import { GetPrayerTimesInput } from './inputs/get-prayer-times.input';

@Injectable()
export class PrayerService {
  constructor(private prayerRepo: PrayerRepository) {}
  async getPrayerTimes(input: GetPrayerTimesInput) {
    return await this.prayerRepo.getPrayerTimes(input);
  }
}
