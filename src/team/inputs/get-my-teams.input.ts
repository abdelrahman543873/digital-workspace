import { Pagination } from './../../shared/utils/pagination.input';
import { IsOptional, IsMongoId } from 'class-validator';

export class MyTeamsInput extends Pagination {
  @IsOptional()
  @IsMongoId()
  userId?: string;
}
