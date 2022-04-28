import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AcquireMicrosoftTokenInput {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  client_info?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  session_state?: string;
}
