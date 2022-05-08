import { IsDateString, IsNumber, MinDate } from 'class-validator';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateLeaveTypeInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  accrual?: string;

  @IsOptional()
  @IsNumber()
  startingMonth?: number;

  @IsOptional()
  @IsNumber()
  maximumDays?: number;

  @IsOptional()
  @IsDateString()
  @MinDate(new Date())
  effectiveDate?: Date;
}
