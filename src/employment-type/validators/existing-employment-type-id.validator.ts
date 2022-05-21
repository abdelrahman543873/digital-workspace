import { Injectable } from '@nestjs/common';
import { EmploymentTypeRepository } from '../employment-type.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'ExistingEmploymentTypeId', async: true })
export class ExistingEmploymentTypeId implements ValidatorConstraintInterface {
  constructor(private employmentTypeRepository: EmploymentTypeRepository) {}

  async validate(text: string): Promise<boolean> {
    const employmentType =
      await this.employmentTypeRepository.findEmploymentType({
        id: text,
      });
    if (!employmentType) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `employment type id ${args.value} doesn't exist`;
  }
}

export function IsExistingEmploymentType(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingEmploymentTypeId,
    });
  };
}
