import { Transform, TransformFnParams } from 'class-transformer';
import {
  Allow,
  IsDateString,
  IsDefined,
  isEmail,
  isMongoId,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidationError,
} from 'class-validator';
import { Types } from 'mongoose';
import { MinLength } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class CreateLeaveInput {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsDefined()
  @Transform((params: TransformFnParams) => {
    if (!isMongoId(params.value))
      throw new BadRequestException(`value of ${params.key} isn't a mongoId`);
    return params.value ? new Types.ObjectId(`${params.value}`) : params.value;
  })
  reason: string;

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
}
