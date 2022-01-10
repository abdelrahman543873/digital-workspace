import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import NodeEnvironment from 'jest-environment-node';
import { AppModule } from '../src/app.module';

class NestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }
  app: INestApplication;

  async setup() {
    await super.setup();
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    this.app = module.createNestApplication();
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        stopAtFirstError: true,
        forbidNonWhitelisted: true,
      }),
    );
    await this.app.init();
    this.global.testingModule = module;
  }

  async teardown() {
    await this.app.close();
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

export default NestEnvironment;
