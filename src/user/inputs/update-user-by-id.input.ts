import { Type } from 'class-transformer';
import {
  Allow,
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsISO31661Alpha3,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Experience, Skill, Education } from '../schema/user.schema';

export class UpdateUserByIdInput {
  @IsMongoId()
  userId: string;

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
  @IsISO31661Alpha3()
  nationality?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @Allow()
  profilePic: string;

  @Allow()
  coverPic: string;
}
