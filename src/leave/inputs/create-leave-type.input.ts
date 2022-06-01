import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLeaveTypeInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  description: string;
}
