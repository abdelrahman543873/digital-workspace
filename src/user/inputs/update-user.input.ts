import { Type } from 'class-transformer';
import {
  Allow,
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Experience, Skill, Education } from '../schema/user.schema';

export class UpdateUserInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullName?: string;

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

  @Allow()
  profilePic: string;

  @Allow()
  coverPic: string;
}
