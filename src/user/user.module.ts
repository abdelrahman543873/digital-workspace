import { DirectManagerIdValidator } from './validators/direct-manager-validator';
import { Module, Logger } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { TestUser, TestUserSchema } from './schema/test-user.schema';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { filename } from '../shared/utils/multer-file-name';
import { HttpModule } from '@nestjs/axios';
import { Agent } from 'https';
import { ConfidentialApplication } from '../shared/providers/confidential-client-app';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENV_VARIABLE_NAMES } from '../app.const';
import { ExistingUserValidator } from './validators/existing-user.validator';
import { CorrectPassValidator } from './validators/correct-pass.validator';
import { IsUserDepartmentConstraint } from './validators/user-department.validator';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: TestUser.name, schema: TestUserSchema },
    ]),
    MulterModule.register({
      preservePath: true,
      storage: diskStorage({
        destination: './client/pictures',
        filename,
      }),
    }),
    HttpModule.register({
      httpsAgent: new Agent({ rejectUnauthorized: false }),
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_VARIABLE_NAMES.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get<string>(
            ENV_VARIABLE_NAMES.JWT_EXPIRY_TIME,
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    Logger,
    ConfidentialApplication,
    DirectManagerIdValidator,
    ExistingUserValidator,
    CorrectPassValidator,
    IsUserDepartmentConstraint,
  ],
  exports: [UserRepository],
})
export class UserModule {}
