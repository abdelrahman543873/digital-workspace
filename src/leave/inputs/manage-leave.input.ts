import { Transform } from 'class-transformer';
import {
  Allow,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { getValuesFromEnum } from '../../shared/utils/columnEnum';
import { LEAVE_STATUS } from '../leave.enum';
import { User } from '../../user/schema/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { LeaveStatusValidator } from '../../department/validators/leave-status.validator';
import { IsExistingLeave } from '../validators/existing-leave.validator';
import { IsDirectManagerOrHR } from '../validators/employee-is-direct-manager-hr.validator';
import { IsLeaveRejected } from '../validators/is-leave-rejected.validator';

export class ManageLeaveInput {
  @Transform(mongoIdTransform)
  @IsDefined()
  @IsExistingLeave()
  @IsDirectManagerOrHR()
  @ApiProperty({ type: 'string' })
  id: ObjectId;

  @Validate(LeaveStatusValidator)
  @IsIn(getValuesFromEnum(LEAVE_STATUS))
  status: string;

  @Allow()
  @IsLeaveRejected()
  rejectionJustification?: string;

  @ApiProperty({ readOnly: true })
  @Allow()
  currentUser?: User;
}
