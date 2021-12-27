import { Type } from 'class-transformer';
import {
  Allow,
  IsIn,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
} from 'class-validator';
import { PRIORITIES } from '../../app.const';
import { Min } from 'class-validator';

export class ApplyForLeaveInput {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsIn(PRIORITIES)
  priority: string;

  @Allow()
  attachments: string[];

  @Max(25)
  @Min(1)
  @IsInt()
  @Type(() => Number)
  leaveDays: number;
}
