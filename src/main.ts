import 'winston-mongodb';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { utilities, WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const options = new DocumentBuilder()
    .setTitle('🚀social-media')
    .setDescription('social media API description')
    .setVersion('1.0')
    .addTag('post', 'post routes')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
