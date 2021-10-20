import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { WeatherModule } from './weather/weather.module';
import { DataBaseModule } from './shared/database/database.module';
import { PrayerModule } from './prayer/prayer.module';
import { CurrencyModule } from './currency/currency.module';
import { UserModule } from './user/user.module';
import { HelperModule } from './shared/helper/helper.module';
import { CommentModule } from './comment/comment.module';
import { ServicesModule } from './shared/services/services.module';
import { AuthModule } from './shared/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: './client',
    }),
    MulterModule.register({
      dest: './client',
    }),
    DataBaseModule,
    HelperModule,
    PostModule,
    WeatherModule,
    PrayerModule,
    CurrencyModule,
    UserModule,
    CommentModule,
    ServicesModule,
    AuthModule,
  ],
})
export class AppModule {}
