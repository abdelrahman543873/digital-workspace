import {
  Allow,
  IsIn,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
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

  @IsNumber()
  @IsInt()
  leaveDays: number;
}
