import { User } from './../schema/user.schema';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  Validate,
  Allow,
  MaxLength,
} from 'class-validator';
import { AddUserInput } from './add-user.input';
import { DirectManagerIdValidator } from '../validators/direct-manager-validator';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { MinLength } from 'class-validator';
import { CorrectPassValidator } from '../validators/correct-pass.validator';

export class UpdateUserInput extends PartialType(
  OmitType(AddUserInput, ['directManagerId', 'password']),
) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword?: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(256)
  @Validate(CorrectPassValidator)
  password?: string;

  @IsOptional()
  @Validate(DirectManagerIdValidator)
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  directManagerId?: ObjectId;

  @ApiProperty({ readOnly: true })
  @Allow()
  currentUser?: User;
}
