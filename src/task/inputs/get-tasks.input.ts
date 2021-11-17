import { IsIn, IsMongoId, IsOptional } from 'class-validator';
import { Pagination } from '../../shared/utils/pagination.input';
import { TASK_STATUS } from '../../app.const';

export class GetTasksInput extends Pagination {
  @IsOptional()
  @IsIn(TASK_STATUS)
  status?: string;
}
