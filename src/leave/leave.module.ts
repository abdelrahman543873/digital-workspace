import { LeaveRepository } from './leave.repository';
import { Module } from '@nestjs/common';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { LeaveBalanceValidator } from './validators/leave-balance.validator';
import { UserModule } from '../user/user.module';
import { filename } from '../shared/utils/multer-file-name';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { LeaveReasonRepository } from './leave-reason.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Leave, LeaveSchema } from './schema/leave.schema';
import { LeaveReason, LeaveReasonSchema } from './schema/reason.schema';

@Module({
  imports: [
    MulterModule.register({
      preservePath: true,
      storage: diskStorage({
        destination: './client/leaves',
        filename,
      }),
    }),
    MongooseModule.forFeature([
      { name: Leave.name, schema: LeaveSchema },
      { name: LeaveReason.name, schema: LeaveReasonSchema },
    ]),
  ],
  controllers: [LeaveController],
  providers: [
    LeaveService,
    LeaveBalanceValidator,
    LeaveRepository,
    LeaveReasonRepository,
  ],
})
export class LeaveModule {}
