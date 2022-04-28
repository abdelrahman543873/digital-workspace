import { IsDefined, Validate } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { AddUserInput } from './add-user.input';
import { Transform } from 'class-transformer';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { ObjectId } from 'mongoose';
import { ExistingUserValidator } from '../validators/existing-user.validator';

export class UpdateUserByIdInput extends PartialType(AddUserInput) {
  @IsDefined()
  @Validate(ExistingUserValidator)
  @Transform(mongoIdTransform)
  userId: ObjectId;
}
