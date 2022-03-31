import { Injectable } from '@nestjs/common';
import { EmploymentTypeRepository } from '../employment-type.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'UniqueEmploymentTypeName', async: true })
export class UniqueEmploymentTypeName implements ValidatorConstraintInterface {
  constructor(private employmentTypeRepository: EmploymentTypeRepository) {}

  async validate(text: string): Promise<boolean> {
    const employmentType =
      await this.employmentTypeRepository.findEmploymentTypeByName(text);
    if (employmentType) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} employment type already exists`;
  }
}
