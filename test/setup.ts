import path from 'path';
import fs from 'fs';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { APP_FILTER } from '@nestjs/core';
import { BaseHttpExceptionFilter } from '../src/shared/exceptions/base-http-exception-filter';
import { MongooseExceptionFilter } from '../src/shared/exceptions/mongo-exception-filter';
import { FileCloudUploadInterceptor } from '../src/shared/interceptors/file-cloud-upload.interceptor';
import { SeedUsersServices } from '../src/shared/services/seed-users.service';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';

const mongod = new MongoMemoryServer({ binary: { version: '4.2.8' } });
module.exports = async (): Promise<void> => {
  await mongod.start();
  const mongoConfig = {
    mongoDBName: 'jest',
    mongoUri: await mongod.getUri(),
  };
  fs.writeFileSync('globalConfig.json', JSON.stringify(mongoConfig));
  global.__MONGOD__ = mongod;
  global.mongoUri = mongoConfig.mongoUri;
  global.mongoDBName = mongoConfig.mongoDBName;
  const seedUsersServices = {
    onApplicationBootstrap: async () => {
      //mocking purposes
    },
  };

  const fileUploadInterceptor = {
    NestInterceptor: async () => {
      //mocking purposes
    },
  };
  const module = await Test.createTestingModule({
    imports: [AppModule],
    providers: [
      {
        provide: APP_FILTER,
        useClass: BaseHttpExceptionFilter,
      },
      {
        provide: APP_FILTER,
        useClass: MongooseExceptionFilter,
      },
    ],
  })
    .overrideProvider(SeedUsersServices)
    .useValue(seedUsersServices)
    .overrideInterceptor(FileCloudUploadInterceptor)
    .useValue(fileUploadInterceptor)
    .compile();

  const app = module.createNestApplication();
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.init();
  global.app = app;
};
