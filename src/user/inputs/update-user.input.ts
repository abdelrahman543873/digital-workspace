import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  Min,
  Validate,
} from 'class-validator';
import { AddUserInput } from './add-user.input';
import { DirectManagerIdValidator } from '../validators/direct-manager-validator';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UpdateUserInput extends PartialType(AddUserInput) {
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
}
