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
} from 'class-validator';
import { Experience, Education } from '../schema/user.schema';
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
import { Validate, ArrayUnique } from 'class-validator';
import { jsonArrayTransform } from '../../shared/utils/json-array.transform';
import { ExistingUserValidator } from '../validators/existing-user.validator';
import { ExistingSkillId } from '../../skill/validators/existing-skill-id.validator';
import { ExistingInterestId } from '../../interest/validators/existing-interest-id.validator';
import { ExistingRoleIdValidator } from '../../role/validators/existing-role-id.validator';
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
  @ArrayUnique()
  @Type(() => Experience)
  @ApiProperty({ type: [Experience] })
  @Transform(jsonArrayTransform)
  experience?: Experience[];

  @IsOptional()
  // TODO : validate if skill already exists for user
  @Validate(ExistingSkillId, { each: true })
  @Transform(mongoIdArrayTransform)
  @ArrayUnique()
  @ApiProperty({ type: [String] })
  skills?: ObjectId[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @Type(() => Education)
  @ApiProperty({ type: [Education] })
  @Transform(jsonArrayTransform)
  education?: Education[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @Validate(ExistingUserValidator)
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
  joiningDate?: Date;

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
  @Type(() => Number)
  yearsOfExperience?: number;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  profilePic?: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  coverPic?: string;

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
  @ApiProperty({ type: 'string' })
  level?: ObjectId;

  @IsOptional()
  @Transform(mongoIdTransform)
  @Validate(ExistingRoleIdValidator)
  @ApiProperty({ type: 'string' })
  role?: ObjectId;

  @IsOptional()
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  country?: ObjectId;

  @IsOptional()
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  department?: ObjectId;

  @IsOptional()
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  employmentType?: ObjectId;

  @IsOptional()
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  title?: ObjectId;

  @IsOptional()
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  team?: ObjectId;

  @IsOptional()
  @ArrayUnique()
  @Transform(mongoIdArrayTransform)
  // TODO : validate if interest already exists for user
  @Validate(ExistingInterestId, { each: true })
  @ApiProperty({ type: [String] })
  interests?: ObjectId[];
}
