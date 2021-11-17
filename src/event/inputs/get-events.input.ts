import { IsMongoId, IsOptional } from 'class-validator';
import { Pagination } from '../../shared/utils/pagination.input';

export class GetEventsInput extends Pagination {
  @IsOptional()
  @IsMongoId()
  userId?: string;
}
