import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchUserInput {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: string;
}
