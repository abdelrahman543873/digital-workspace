import { CreateLeaveCriteriaInput } from './create-leave-criteria.input';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
export class UpdateLeaveCriteriaInput extends PartialType(
  CreateLeaveCriteriaInput,
) {
  @IsDefined()
  @Expose({ name: 'id' })
  @ApiProperty({ name: 'id', type: 'string' })
  @Transform(mongoIdTransform)
  _id: ObjectId;
}
