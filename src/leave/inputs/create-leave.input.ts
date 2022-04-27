import { Transform, TransformFnParams } from 'class-transformer';
import {
  Allow,
  IsDateString,
  IsDefined,
  isMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { Types } from 'mongoose';
import { MinLength } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { LeaveBalanceValidator } from '../validators/leave-balance.validator';
import { LeaveTypeValidator } from '../validators/leave-type.validator';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';

export class CreateLeaveInput {
  @IsDateString()
  @Validate(LeaveBalanceValidator)
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsDefined()
  @Validate(LeaveTypeValidator)
  @Transform(mongoIdTransform)
  type: string;

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

  @Allow()
  attachments?: string[];

  @IsOptional()
  @Transform(mongoIdTransform)
  replacement?: string;

  // added by the 'request in body interceptor' to be able to get the user in the input validator
  @Allow()
  currentUser: string;
}
