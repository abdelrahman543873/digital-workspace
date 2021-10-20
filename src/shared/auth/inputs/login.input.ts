import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';

export class LoginInput {
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(6)
  @MaxLength(255)
  password: string;
}
