import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLevelInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
