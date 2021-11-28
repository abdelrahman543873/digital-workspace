import { IsNotEmpty, IsString } from 'class-validator';
import { Pagination } from '../../shared/utils/pagination.input';

export class SearchUserInput extends Pagination {
  @IsString()
  @IsNotEmpty()
  keyword: string;
}
