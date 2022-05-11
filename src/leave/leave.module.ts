import { LeaveRepository } from './leave.repository';
import { Module } from '@nestjs/common';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { LeaveBalanceValidator } from './validators/leave-balance.validator';
import { filename } from '../shared/utils/multer-file-name';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { LeaveTypeRepository } from './leave-type.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Leave, LeaveSchema } from './schema/leave.schema';
import { LeaveType, LeaveTypeSchema } from './schema/leave-type.schema';
import { LeaveTypeValidator } from './validators/leave-type.validator';
import { ExistingLeaveValidator } from './validators/existing-leave.validator';
import { EmployeeIsDirectManagerValidator } from './validators/employee-is-direct-manager.validator';
import { UserModule } from '../user/user.module';
import { ValidLeaveCancellationValidator } from './validators/valid-leave-cancellation.validator';

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
      { name: LeaveType.name, schema: LeaveTypeSchema },
    ]),
    UserModule,
  ],
  controllers: [LeaveController],
  providers: [
    LeaveService,
    LeaveBalanceValidator,
    LeaveRepository,
    LeaveTypeRepository,
    LeaveTypeValidator,
    EmployeeIsDirectManagerValidator,
    ExistingLeaveValidator,
    ValidLeaveCancellationValidator,
  ],
})
export class LeaveModule {}
