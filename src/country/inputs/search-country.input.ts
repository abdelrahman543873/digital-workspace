import { Pagination } from '../../shared/utils/pagination.input';
import { IsString } from 'class-validator';

export class SearchCountryInput extends Pagination {
  @IsString()
  name: string;
}
