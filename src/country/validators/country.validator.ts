import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import country from 'i18n-iso-countries';

@ValidatorConstraint({ name: 'noEmoji', async: false })
export class IsCountryName implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (!country.getAlpha2Code(text, 'en')) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return "the provided string isn't a country please provide an iso 3166 country name";
  }
}
