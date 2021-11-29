import { IsDateString, IsOptional } from 'class-validator';
import { Pagination } from '../../shared/utils/pagination.input';

export class GetUserByBirthDate extends Pagination {
  @IsOptional()
  @IsDateString()
  date?: string;
}
