import 'winston-mongodb';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { utilities, WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.MongoDB({
          level: 'warn',
          db: 'mongodb://localhost:27017/logs',
          options: {
            useUnifiedTopology: true,
          },
          name: 'mongoLog',
        }),
        new transports.Console({
          level: 'info',
          format: format.combine(
            format.timestamp(),
            format.ms(),
            utilities.format.nestLike(),
          ),
        }),
      ],
    }),
  });
  await app.listen(3000);
}
bootstrap();
