import {
  IsBoolean,
  IsEmail,
  IsLowercase,
  IsMongoId,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetExistingUserInput {
  @IsOptional()
  @IsMongoId()
  @IsString()
  _id?: ObjectId;

  @IsOptional()
  @IsLowercase()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  socialMediaId?: string;

  @IsOptional()
  @IsPhoneNumber()
  mobile?: string;

  @IsOptional()
  @IsBoolean()
  password?: boolean;
}