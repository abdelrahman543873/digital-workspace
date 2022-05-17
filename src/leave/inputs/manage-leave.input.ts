import { Transform } from 'class-transformer';
import {
  Allow,
  IsDefined,
  IsIn,
  IsOptional,
  IsString,
  Validate,
  MinLength,
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
import { IsExistingRejectionReason } from '../validators/is-existing-rejection-reason.validator';
import { MaxLength } from 'class-validator';
import { IsLeaveRequirementsMet } from '../validators/is-rejection-requirements-met.validator';

export class ManageLeaveInput {
  @Transform(mongoIdTransform)
  @IsDefined()
  @IsExistingLeave()
  @IsDirectManagerOrHR()
  @ApiProperty({ type: 'string' })
  id: ObjectId;

  @Validate(LeaveStatusValidator)
  @IsIn(getValuesFromEnum(LEAVE_STATUS))
  @IsLeaveRequirementsMet()
  status: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  rejectionJustification?: string;

  @IsOptional()
  @IsExistingRejectionReason()
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  rejectionReason?: ObjectId;

  @ApiProperty({ readOnly: true })
  @Allow()
  currentUser?: User;
}
