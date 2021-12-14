import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LogUserInput {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  session_state?: string;
}
