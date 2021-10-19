import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { SeedUsersServices } from '../src/shared/services/seed-users.service';

export let app: INestApplication;

const seedUsersServices = {
  onApplicationBootstrap: jest.fn(async () => {
    //mocking purposes
  }),
};

export const moduleRef = async (): Promise<TestingModule> => {
  return await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(SeedUsersServices)
    .useValue(seedUsersServices)
    .compile();
};

beforeAll(async () => {
  const module = await moduleRef();
  app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.init();
});

afterAll(async () => {
  await app.close();
});
