import { CreateCountryInput } from './create-country.input';
import { PickType } from '@nestjs/swagger';

export class DeleteCountryInput extends PickType(CreateCountryInput, [
  'name',
] as const) {}
