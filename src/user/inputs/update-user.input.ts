import { User } from './../schema/user.schema';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  Min,
  Validate,
  Allow,
} from 'class-validator';
import { AddUserInput } from './add-user.input';
import { DirectManagerIdValidator } from '../validators/direct-manager-validator';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UpdateUserInput extends PartialType(
  OmitType(AddUserInput, ['directManagerId']),
) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Min(8)
  newPassword?: string;

  @IsOptional()
  @Validate(DirectManagerIdValidator)
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  directManagerId?: ObjectId;

  @ApiProperty({ readOnly: true })
  @Allow()
  currentUser: User;
}
