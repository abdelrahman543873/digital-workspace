import { PrayerService } from './prayer.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetPrayerTimesInput } from './inputs/get-prayer-times.input';

@Controller('prayer')
export class PrayerController {
  constructor(private prayerService: PrayerService) {}

  @ApiTags('prayer')
  @Get('times')
  async getPrayerTimes(@Param() input: GetPrayerTimesInput) {
    return await this.prayerService.getPrayerTimes(input);
  }
}
