import {
  IsEmail,
  IsLowercase,
  IsMongoId,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class GetExistingUserInput {
  @IsOptional()
  @IsMongoId()
  @IsString()
  _id?: string;

  @IsOptional()
  @IsLowercase()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  mobile?: string;
}
