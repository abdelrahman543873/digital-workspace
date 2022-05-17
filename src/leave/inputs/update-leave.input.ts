import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLeaveInput } from './create-leave.input';
import { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { IsExistingLeave } from '../validators/existing-leave.validator';
export class UpdateLeaveInput extends PartialType(CreateLeaveInput) {
  @IsExistingLeave()
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  id: ObjectId;
}
