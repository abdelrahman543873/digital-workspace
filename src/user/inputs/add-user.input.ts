import { Transform, Type } from 'class-transformer';
import {
  Allow,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsDateString,
  IsEmail,
  IsISO31661Alpha2,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Experience, Skill, Education } from '../schema/user.schema';

export class AddUserInput {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(256)
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Experience)
  experience?: Experience[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Skill)
  skill?: Skill[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Education)
  education?: Education[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsMongoId()
  directManagerId?: string;

  @IsOptional()
  @IsISO31661Alpha2()
  nationality?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  position?: string;

  @IsOptional()
  @IsBooleanString()
  isCompany?: boolean;

  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @IsOptional()
  @IsUrl()
  twitter?: string;

  @IsOptional()
  @IsBooleanString()
  isAdmin?: boolean;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @Allow()
  profilePic: string;

  @Allow()
  coverPic: string;
}
