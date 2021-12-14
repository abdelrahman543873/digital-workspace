import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserTokenInput {
  @IsString()
  @IsNotEmpty()
  code: string;
}
