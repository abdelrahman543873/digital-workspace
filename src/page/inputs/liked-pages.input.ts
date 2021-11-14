import { IsMongoId, IsOptional } from 'class-validator';
import { Pagination } from '../../shared/utils/pagination.input';

export class LikedPagesInput extends Pagination {
  @IsOptional()
  @IsMongoId()
  userId?: string;
}
