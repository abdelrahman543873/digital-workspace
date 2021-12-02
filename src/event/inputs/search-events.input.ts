import { IsNotEmpty, IsString } from 'class-validator';
import { Pagination } from '../../shared/utils/pagination.input';

export class SearchEventInput extends Pagination {
  @IsString()
  @IsNotEmpty()
  keyword: string;
}
