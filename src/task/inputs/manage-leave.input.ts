import { IsIn, IsMongoId, IsOptional, IsString } from 'class-validator';
import { TASK_STATUS } from '../../app.const';

export class ManageLeaveInput {
  @IsMongoId()
  taskId: string;

  @IsOptional()
  @IsString()
  @IsIn(TASK_STATUS)
  status?: string;
}
