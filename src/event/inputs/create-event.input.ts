import { Allow, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  date: string;

  @Allow()
  logo: string;
}
