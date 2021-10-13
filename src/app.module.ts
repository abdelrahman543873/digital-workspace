import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { WeatherModule } from './weather/weather.module';
import { DataBaseModule } from './shared/database/database.module';
import { PrayerModule } from './prayer/prayer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
    PostModule,
    WeatherModule,
    PrayerModule,
  ],
})
export class AppModule {}
