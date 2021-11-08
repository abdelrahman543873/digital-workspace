import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateUserInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Min(8)
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Min(8)
  newPassword?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  experience?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsMongoId()
  directManagerId?: string | ObjectId;
}
