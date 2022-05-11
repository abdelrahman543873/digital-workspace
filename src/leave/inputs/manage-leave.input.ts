import { Transform } from 'class-transformer';
import { Allow, IsDefined, IsIn, Validate } from 'class-validator';
import { ObjectId } from 'mongoose';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { getValuesFromEnum } from '../../shared/utils/columnEnum';
import { LEAVE_STATUS } from '../leave.enum';
import { User } from '../../user/schema/user.schema';
import { EmployeeIsDirectManagerValidator } from '../validators/employee-is-direct-manager.validator';
import { ApiProperty } from '@nestjs/swagger';

export class ManageLeaveInput {
  @Transform(mongoIdTransform)
  @IsDefined()
  @Validate(EmployeeIsDirectManagerValidator)
  @ApiProperty({ type: 'string' })
  id: ObjectId;

  @IsIn(getValuesFromEnum(LEAVE_STATUS))
  status: string;

  @ApiProperty({ readOnly: true })
  @Allow()
  currentUser?: User;
}
