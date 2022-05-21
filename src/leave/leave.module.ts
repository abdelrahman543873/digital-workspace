import { LeaveRepository } from './repositories/leave.repository';
import { Module } from '@nestjs/common';
import { LeaveController } from './leave.controller';
import { LeaveService } from './leave.service';
import { LeaveBalanceValidator } from './validators/leave-balance.validator';
import { filename } from '../shared/utils/multer-file-name';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { LeaveTypeRepository } from './repositories/leave-type.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Leave, LeaveSchema } from './schema/leave.schema';
import { LeaveType, LeaveTypeSchema } from './schema/leave-type.schema';
import { LeaveTypeValidator } from './validators/leave-type.validator';
import { UserModule } from '../user/user.module';
import { ValidLeaveCancellationValidator } from './validators/valid-leave-cancellation.validator';
import { ExistingLeaveConstraint } from './validators/existing-leave.validator';
import { IsDirectManagerOrHRConstraint } from './validators/employee-is-direct-manager-hr.validator';
import { RejectionReasonRepository } from './repositories/rejection-reason.repository';
import {
  RejectionReason,
  RejectionReasonSchema,
} from './schema/rejection-reason.schema';
import { ExistingRejectionReasonConstraint } from './validators/is-existing-rejection-reason.validator';
import { LeaveCriteriaRepository } from './repositories/leave-criteria.repository';
import {
  LeaveCriteria,
  LeaveCriteriaSchema,
} from './schema/leave-criteria.schema';

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
      { name: RejectionReason.name, schema: RejectionReasonSchema },
      { name: LeaveCriteria.name, schema: LeaveCriteriaSchema },
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
    RejectionReasonRepository,
    IsDirectManagerOrHRConstraint,
    ExistingLeaveConstraint,
    ValidLeaveCancellationValidator,
    ExistingRejectionReasonConstraint,
    LeaveCriteriaRepository,
  ],
})
export class LeaveModule {}
