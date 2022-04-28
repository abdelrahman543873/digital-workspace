import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateLevelInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
