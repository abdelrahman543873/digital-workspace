import { CreateLeaveTypeInput } from './create-leave-type.input';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { ObjectId } from 'mongoose';
import { Validate } from 'class-validator';
import { LeaveTypeValidator } from '../validators/leave-type.validator';

export class UpdateLeaveTypeInput extends PartialType(CreateLeaveTypeInput) {
  @Validate(LeaveTypeValidator)
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  id: ObjectId;
}
