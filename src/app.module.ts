import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      // done this way to be able to connect in case of testing
      // docker and real runtime without docker
      process.env.LOCAL_MONGO_DB || global['__MONGO_URI__'],
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectionFactory: (connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-aggregate-paginate-v2'));
          return connection;
        },
      },
    ),
    PostModule,
    WeatherModule,
  ],
})
export class AppModule {}
