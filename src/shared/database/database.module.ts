import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { readFileSync } from 'fs';
import { ENV_VARIABLE_NAMES } from '../../app.const';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        // done this way to be able to connect in case of testing
        // docker and real runtime without docker
        uri:
          configService.get<string>(ENV_VARIABLE_NAMES.MONGO_DB) ||
          JSON.parse(readFileSync('globalConfig.json', 'utf-8')).mongoUri ||
          configService.get<string>(ENV_VARIABLE_NAMES.LOCAL_MONGO_DB),
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
