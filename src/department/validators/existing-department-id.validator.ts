import { Injectable } from '@nestjs/common';
import { DepartmentService } from '../department.service';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'ExistingDepartmentId', async: true })
export class ExistingDepartmentId implements ValidatorConstraintInterface {
  constructor(private departmentService: DepartmentService) {}

  async validate(text: string): Promise<boolean> {
    const department = await this.departmentService.findDepartment({
      id: text,
    });
    if (department) return true;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `department id ${args.value} doesn't exist`;
  }
}

export function IsExistingDepartment(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingDepartmentId,
    });
  };
}
