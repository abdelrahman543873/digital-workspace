import { IsNotEmpty, IsString } from 'class-validator';
import { Pagination } from '../../shared/utils/pagination.input';

export class SearchPageInput extends Pagination {
  @IsString()
  @IsNotEmpty()
  keyword: string;
}
