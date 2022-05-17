import { IsIn, IsOptional, IsString } from 'class-validator';
import { LEAVE_STATUS } from '../leave.enum';
import { getValuesFromEnum } from '../../shared/utils/columnEnum';
import { Pagination } from '../../shared/utils/pagination.input';

export class GetLeavesAssignedListInput extends Pagination {
  @IsOptional()
  @IsString()
  @IsIn(getValuesFromEnum(LEAVE_STATUS))
  status?: string;
}
