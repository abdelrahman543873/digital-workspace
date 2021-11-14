import { Pagination } from './../shared/utils/pagination.input';
import { IsOptional, IsMongoId } from 'class-validator';

export class JoinedGroupsInput extends Pagination {
  @IsOptional()
  @IsMongoId()
  userId?: string;
}
