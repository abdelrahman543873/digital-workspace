import { IsDefined, IsOptional, Validate } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AddUserInput } from './add-user.input';
import { Transform } from 'class-transformer';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { ObjectId } from 'mongoose';
import { ExistingUserValidator } from '../validators/existing-user.validator';
import { DirectManagerIdValidator } from '../validators/direct-manager-validator';

export class UpdateUserByIdInput extends PartialType(AddUserInput) {
  @IsDefined()
  @Validate(ExistingUserValidator)
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  userId: ObjectId;

  @IsOptional()
  @Validate(DirectManagerIdValidator)
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  directManagerId?: ObjectId;
}
