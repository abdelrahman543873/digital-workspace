import { GlobalExceptionFilter } from './../src/shared/exceptions/global-excpetion.filter';
import fs from 'fs';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { BaseHttpExceptionFilter } from '../src/shared/exceptions/base-http-exception.filter';
import { MongooseExceptionFilter } from '../src/shared/exceptions/mongo-exception-filter';
import { FileCloudUploadInterceptor } from '../src/shared/interceptors/file-cloud-upload.interceptor';
import { SeedUsersServices } from '../src/shared/services/seed-users.service';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

const mongod = new MongoMemoryServer({
  binary: { version: '5.0.6', arch: 'x64' },
});
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
  })
    .overrideProvider(SeedUsersServices)
    .useValue(seedUsersServices)
    .overrideInterceptor(FileCloudUploadInterceptor)
    .useValue(fileUploadInterceptor)
    .compile();

  const app = module.createNestApplication();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new BaseHttpExceptionFilter(),
    new MongooseExceptionFilter(),
  );
  await app.init();
  global.app = app;
};
