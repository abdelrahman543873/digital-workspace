import { IsIn, IsOptional, IsString } from 'class-validator';
import { STATUS } from '../user.enum';
import { getValuesFromEnum } from '../../shared/utils/columnEnum';
import { Pagination } from '../../shared/utils/pagination.input';

export class GetUserListInput extends Pagination {
  @IsOptional()
  @IsString()
  @IsIn(getValuesFromEnum(STATUS))
  status?: string;
}
