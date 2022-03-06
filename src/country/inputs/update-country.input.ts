import { CreateCountryInput } from './create-country.input';
import { PartialType } from '@nestjs/swagger';

export class UpdateCountryInput extends PartialType(CreateCountryInput) {}
