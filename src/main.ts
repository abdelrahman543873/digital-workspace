import 'winston-mongodb';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { utilities, WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { BaseHttpExceptionFilter } from './shared/exceptions/base-http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        // new transports.MongoDB({
        //   level: 'warn',
        //   db: 'mongodb://localhost:27017/logs',
        //   options: {
        //     useUnifiedTopology: true,
        //   },
        //   name: 'mongoLog',
        // }),
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
  const options = new DocumentBuilder()
    .setTitle('🚀digital work space🚀')
    .setDescription('digital workspace API description')
    .setVersion('1.0')
    .addTag('authentication', 'authentication routes')
    .addTag('user', 'user routes')
    .addTag('post', 'post routes')
    .addTag('group', 'group related routes')
    .addTag('team', 'team related routes')
    .addTag('page', 'page routes')
    .addTag('comment', 'comment routes')
    .addTag('weather', 'weather api routes')
    .addTag('prayer', 'prayer api routes')
    .addTag('currency', 'currency api routes')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new BaseHttpExceptionFilter());
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
