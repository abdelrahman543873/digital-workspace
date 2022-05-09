import { Transform } from 'class-transformer';
import {
  Allow,
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
import { LeaveTypeValidator } from '../validators/leave-type.validator';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { User } from '../../user/schema/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeaveInput {
  @ApiProperty()
  @IsDateString()
  @Validate(LeaveBalanceValidator)
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;

  @ApiProperty()
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

  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @Allow()
  attachments?: string[];

  @IsOptional()
  @Transform(mongoIdTransform)
  replacement?: string;

  // added by the 'request in body interceptor' to be able to get the user in the input validator
  @ApiProperty({ readOnly: true })
  @Allow()
  currentUser: User;
}
