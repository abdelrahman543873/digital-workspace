import { IsString, Validate } from 'class-validator';
import { IsCountryName } from '../validators/country.validator';

export class CreateCountryInput {
  @Validate(IsCountryName)
  @IsString()
  name: string;
}
