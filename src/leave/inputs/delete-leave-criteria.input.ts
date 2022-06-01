import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { ObjectId } from 'mongoose';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';

export class DeleteLeaveCriteriaInput {
  @Expose({ name: 'id' })
  @IsDefined()
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string', name: 'id' })
  _id: ObjectId;
}
