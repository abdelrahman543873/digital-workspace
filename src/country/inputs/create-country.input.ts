import { Allow, IsISO31661Alpha2, IsString } from 'class-validator';

export class CreateCountryInput {
  @IsISO31661Alpha2()
  @IsString()
  name: string;

  @Allow()
  logo: string;
}
