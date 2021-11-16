import { Allow, IsNotEmpty, IsString } from 'class-validator';

export class CreatePageInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Allow()
  logo: string;
}
