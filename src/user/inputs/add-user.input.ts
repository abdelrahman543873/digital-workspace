import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AddUserInput {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(256)
  password: string;
}
