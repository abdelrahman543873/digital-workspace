import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { SeedUsersServices } from '../src/shared/services/seed-users.service';
import { APP_FILTER } from '@nestjs/core';
import { BaseHttpExceptionFilter } from '../src/shared/exceptions/base-http-exception-filter';
import { AllExceptionsFilter } from '../src/shared/exceptions/generic-error-exception-filter';

export let app: INestApplication;

const seedUsersServices = {
  onApplicationBootstrap: jest.fn(async () => {
    //mocking purposes
  }),
};

export const moduleRef = async (): Promise<TestingModule> => {
  return await Test.createTestingModule({
    imports: [AppModule],
    providers: [
      {
        provide: APP_FILTER,
        useClass: BaseHttpExceptionFilter,
      },
    ],
  })
    .overrideProvider(SeedUsersServices)
    .useValue(seedUsersServices)
    .compile();
};

beforeAll(async () => {
  const module = await moduleRef();
  app = module.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.init();
});

afterAll(async () => {
  await app.close();
});
