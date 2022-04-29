import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLeaveInput } from './create-leave.input';
import { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { Validate } from 'class-validator';
import { ExistingLeaveValidator } from '../validators/existing-leave.validator';
export class UpdateLeaveInput extends PartialType(CreateLeaveInput) {
  @Validate(ExistingLeaveValidator)
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  id: ObjectId;
}
