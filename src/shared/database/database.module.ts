import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot(
      // done this way to be able to connect in case of testing
      // docker and real runtime without docker
      'mongodb://localhost:27017/social-media' || global['__MONGO_URI__'],
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
  ],
})
export class DataBaseModule {}
