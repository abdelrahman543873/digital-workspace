import { Transform, Type } from 'class-transformer';
import {
  Allow,
  IsDate,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { MinLength } from 'class-validator';
import { LeaveBalanceValidator } from '../validators/leave-balance.validator';
import { IsExistingLeaveType } from '../validators/leave-type.validator';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { User } from '../../user/schema/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsUserFittingCriteria } from '../validators/is-user-fitting-criteria.validator';

export class CreateLeaveInput {
  @ApiProperty()
  @IsDate()
  @Validate(LeaveBalanceValidator)
  @Type(() => Date)
  startDate: Date;

  @ApiProperty()
  @IsDate()
  @Validate(LeaveBalanceValidator)
  @Type(() => Date)
  endDate: Date;

  @ApiProperty()
  @IsDefined()
  @IsUserFittingCriteria()
  @IsExistingLeaveType()
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  type: ObjectId;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(5)
  comment?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(5)
  reason?: string;

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @Allow()
  attachments?: string[];

  @IsOptional()
  @Transform(mongoIdTransform)
  replacement?: string;

  // added by the 'request in body interceptor' to be able to get the user in the input validator
  @ApiProperty({ readOnly: true })
  @Allow()
  currentUser?: User;
}
