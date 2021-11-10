import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePageInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
