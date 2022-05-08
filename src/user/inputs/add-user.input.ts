import { Transform, Type } from 'class-transformer';
import {
  Allow,
  ArrayNotEmpty,
  IsArray,
  IsBooleanString,
  IsDateString,
  IsEmail,
  IsIn,
  IsISO31661Alpha2,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Experience, Education, User } from '../schema/user.schema';
import { getValuesFromEnum } from '../../shared/utils/columnEnum';
import {
  STATUS,
  BLOOD_TYPE,
  MARTIAL_STATUS,
  ALLOWED_COUNTRIES_PHONES,
} from '../user.enum';
import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { GENDER, WIDGETS } from '../../app.const';
import { DirectManagerIdValidator } from '../validators/direct-manager-validator';
import { Validate } from 'class-validator';
import {
  mongoIdTransform,
  mongoIdArrayTransform,
} from '../../shared/utils/mongo-id.transform';

export class AddUserInput {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
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
  @Transform(mongoIdArrayTransform)
  @ApiProperty({ type: 'array', items: { type: 'string' } })
  skills?: ObjectId[];

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
  @Validate(DirectManagerIdValidator)
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  directManagerId?: ObjectId;

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

  @ApiProperty()
  @IsIn(getValuesFromEnum(STATUS))
  status: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  governmentalId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  visa?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  passport?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  personalEmail?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  exitReason?: string;

  @IsOptional()
  @IsDateString()
  visaExpiryDate?: Date;

  @IsOptional()
  @IsPhoneNumber()
  emergencyContactNumber?: string;

  @IsOptional()
  @IsIn(getValuesFromEnum(BLOOD_TYPE))
  bloodGroup?: string;

  @IsOptional()
  @IsIn(getValuesFromEnum(MARTIAL_STATUS))
  martialStatus?: string;

  @IsOptional()
  @IsDateString()
  weddingDate?: Date;

  @IsOptional()
  @IsDateString()
  contractEndDate?: Date;

  @IsOptional()
  @IsDateString()
  internshipEndDate?: Date;

  @IsOptional()
  @IsDateString()
  exitDate?: Date;

  @IsOptional()
  @IsDateString()
  resignationDate?: Date;

  @IsOptional()
  @IsNumber()
  yearsOfExperience?: number;

  @Allow()
  profilePic: string;

  @Allow()
  coverPic: string;

  @ApiProperty()
  @IsMobilePhone(ALLOWED_COUNTRIES_PHONES)
  phone: string;

  @ApiProperty()
  @IsIn(GENDER)
  gender: string;

  @IsOptional()
  @IsIn(WIDGETS)
  widgets?: string;

  @IsOptional()
  @Transform(mongoIdTransform)
  level?: string;

  @IsOptional()
  @Transform(mongoIdTransform)
  country?: string;

  @IsOptional()
  @Transform(mongoIdTransform)
  department?: string;

  @IsOptional()
  @Transform(mongoIdTransform)
  employmentType?: string;

  @IsOptional()
  @Transform(mongoIdTransform)
  title?: string;

  @IsOptional()
  @Transform(mongoIdArrayTransform)
  interests?: string[];

  @ApiProperty({ readOnly: true })
  @Allow()
  currentUser: User;
}
