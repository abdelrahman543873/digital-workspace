import 'winston-mongodb';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { BaseHttpExceptionFilter } from './shared/exceptions/base-http-exception-filter';
import compression from 'compression';
import { MongooseExceptionFilter } from './shared/exceptions/mongo-exception-filter';
import { Cluster } from './cluster';
import morganBody from 'morgan-body';
import correlationId from 'express-correlation-id';
import { logTransform } from './shared/utils/transformer.print';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new transports.Console({
          handleExceptions: true,
          format: format.combine(
            format.errors({ stack: true }),
            format.timestamp(),
            format.uncolorize(),
            format.splat(),
            format.printf(logTransform),
          ),
        }),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Unreachable code error
        new transports.MongoDB({
          db: process.env.MONGO_DB || process.env.LOCAL_MONGO_DB,
          options: {
            useUnifiedTopology: true,
          },
          decolorize: true,
          tryReconnect: true,
          handleExceptions: true,
        }),
      ],
      exitOnError: false,
    }),
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const logger = new Logger();
  const options = new DocumentBuilder()
    .setTitle('🚀digital work space🚀')
    .setDescription('digital workspace API description')
    .setVersion('1.0')
    .addTag('authentication', 'authentication routes')
    .addTag('user', 'user routes')
    .addTag('post', 'post routes')
    .addTag('event', 'events routes')
    .addTag('task', 'task api routes')
    .addTag('group', 'group related routes')
    .addTag('team', 'team related routes')
    .addTag('page', 'page routes')
    .addTag('comment', 'comment routes')
    .addTag('weather', 'weather api routes')
    .addTag('prayer', 'prayer api routes')
    .addTag('teams', 'teams endpoints')
    .addTag('country', 'country endpoints')
    .addTag('level', 'level endpoints')
    .addTag('department', 'department endpoints')
    .addTag('employment-type', 'employment-type endpoints')
    .addTag('skill', 'skill endpoints')
    .addTag('title', 'title endpoints')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  app.use(compression());
  app.use(correlationId({ header: 'id' }));
  morganBody(app.getHttpAdapter().getInstance(), {
    skip: (req) =>
      req.method === 'OPTIONS' || req.originalUrl.startsWith('/api'),
    logIP: true,
    logRequestId: true,
    logReqDateTime: true,
    logReqUserAgent: false,
    includeNewLine: false,
    prettify: false,
    stream: {
      write: (message) => {
        logger.warn(message);
        return true;
      },
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(
    new BaseHttpExceptionFilter(),
    new MongooseExceptionFilter(),
  );
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3000);
}
Cluster.register(bootstrap);
