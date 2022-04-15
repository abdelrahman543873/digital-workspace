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

export class CreateLeaveInput {
  @IsDateString()
  @Validate(LeaveBalanceValidator)
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsDefined()
  @Transform((params: TransformFnParams) => {
    if (!isMongoId(params.value))
      throw new BadRequestException(`value of ${params.key} isn't a mongoId`);
    return params.value ? new Types.ObjectId(`${params.value}`) : params.value;
  })
  type: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(5)
  comment?: string;

  @Allow()
  attachments?: string[];

  @IsOptional()
  @Transform((params: TransformFnParams) => {
    if (!isMongoId(params.value))
      throw new BadRequestException(`value of ${params.key} isn't a mongoId`);
    return params.value ? new Types.ObjectId(`${params.value}`) : params.value;
  })
  replacement?: string;

  // added by the 'request in body interceptor' to be able to get the user in the input validator
  @Allow()
  currentUser: string;
}
