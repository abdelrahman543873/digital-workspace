import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PRIORITIES, TASK_STATUS } from '../../app.const';

export class UpdateTaskInput {
  @IsMongoId()
  taskId: string;

  @IsOptional()
  @IsMongoId()
  assignee?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(PRIORITIES)
  priority?: string;

  @IsOptional()
  @IsString()
  @IsIn(TASK_STATUS)
  status?: string;
}
