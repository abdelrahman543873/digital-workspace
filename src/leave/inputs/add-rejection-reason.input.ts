import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class AddRejectionReasonInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  name: string;
}
