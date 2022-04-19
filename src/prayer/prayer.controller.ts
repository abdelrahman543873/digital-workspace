import { PrayerService } from './prayer.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetPrayerTimesInput } from './inputs/get-prayer-times.input';
import { ActiveUserGuard } from '../shared/guards/active-user.guard';

@UseGuards(ActiveUserGuard)
@Controller('prayer')
export class PrayerController {
  constructor(private prayerService: PrayerService) {}

  @ApiTags('prayer')
  @Get('times/:city')
  async getPrayerTimes(@Param() input: GetPrayerTimesInput) {
    return await this.prayerService.getPrayerTimes(input);
  }
}
