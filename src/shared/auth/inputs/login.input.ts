import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';

export class LoginInput {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsOptional()
  @MinLength(6)
  @MaxLength(255)
  password?: string;
}
