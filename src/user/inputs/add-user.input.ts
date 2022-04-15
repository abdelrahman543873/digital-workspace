import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  Allow,
  ArrayNotEmpty,
  isArray,
  IsArray,
  IsBooleanString,
  IsDateString,
  IsEmail,
  IsIn,
  IsISO31661Alpha2,
  isMongoId,
  IsMongoId,
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
import { Experience, Education } from '../schema/user.schema';
import { getValuesFromEnum } from '../../shared/utils/columnEnum';
import { STATUS, BLOOD_TYPE, MARTIAL_STATUS } from '../user.enum';
import { BadRequestException } from '@nestjs/common';
import { Types, ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

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
  @Transform((params: TransformFnParams) => {
    const skills: [string] = params.value;
    const convertedSkillsArray = [];
    if (!isArray(skills) || !skills.length)
      throw new BadRequestException(
        `value of ${params.key} should be an array with mongoIds`,
      );
    skills.forEach((skill) => {
      if (!isMongoId(skill))
        throw new BadRequestException(`value of ${params.key} isn't a mongoId`);
      convertedSkillsArray.push(new Types.ObjectId(`${params.value}`));
    });
    return convertedSkillsArray;
  })
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
  @IsNumber()
  yearsOfExperience?: number;

  @Allow()
  profilePic: string;

  @Allow()
  coverPic: string;
}
