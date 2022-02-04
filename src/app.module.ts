import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PageModule } from './page/page.module';
import { GroupModule } from './group/group.module';
import { TeamModule } from './team/team.module';
import { TaskModule } from './task/task.module';
import { EventModule } from './event/event.module';
import { TeamsModule } from './teams/teams.module';
import { CorrelationIdMiddleware } from './shared/middlewares/correlation-id.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client'),
      renderPath: join(__dirname, '..', '..', 'client'),
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
    PageModule,
    GroupModule,
    TeamModule,
    TaskModule,
    EventModule,
    TeamsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
