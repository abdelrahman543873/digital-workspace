import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { AddUserInput } from './add-user.input';
import { Transform } from 'class-transformer';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { ObjectId } from 'mongoose';
import { ExistingUserValidator } from '../validators/existing-user.validator';
import { DirectManagerIdValidator } from '../validators/direct-manager-validator';

export class UpdateUserByIdInput extends PartialType(
  OmitType(AddUserInput, ['directManagerId', 'password']),
) {
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

  @IsOptional()
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(256)
  // @Validate(CorrectPassValidator)
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword?: string;
}
