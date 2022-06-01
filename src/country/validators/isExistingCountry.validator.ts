import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CountryRepository } from '../country.repository';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingCountryConstraint implements ValidatorConstraintInterface {
  constructor(private countryRepository: CountryRepository) {}
  async validate(_id: ObjectId): Promise<boolean> {
    const country = await this.countryRepository.findOne({
      _id,
    });
    if (!country) return false;
    return true;
  }

  defaultMessage() {
    return "this country doesn't exist";
  }
}

export function IsExistingCountry(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingCountryConstraint,
    });
  };
}
