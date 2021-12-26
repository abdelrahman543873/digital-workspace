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

export class ApplyForLeaveInput {
  @IsMongoId()
  assignee: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsIn(PRIORITIES)
  priority: string;

  @Allow()
  attachments: string[];

  @Max(25)
  @IsInt()
  @Type(() => Number)
  leaveDays: number;
}
