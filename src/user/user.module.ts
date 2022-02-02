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
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, Logger],
  exports: [UserRepository],
})
export class UserModule {}
