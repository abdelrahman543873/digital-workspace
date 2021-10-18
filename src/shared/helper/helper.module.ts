import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HelperService } from './helper.service';
import { User, UserSchema } from '../../user/schema/user.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [HelperService],
  exports: [HelperService],
})
export class HelperModule {}
