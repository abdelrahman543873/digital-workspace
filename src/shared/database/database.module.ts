import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        // done this way to be able to connect in case of testing
        // docker and real runtime without docker
        uri:
          configService.get<string>('LOCAL_MONGO_DB') ||
          global['__MONGO_URI__'],
        connectionFactory: (connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-aggregate-paginate-v2'));
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DataBaseModule {}
