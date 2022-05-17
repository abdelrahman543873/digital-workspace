import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { User } from '../schema/user.schema';
import { UserRepository } from '../user.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserDepartmentConstraint
  implements ValidatorConstraintInterface
{
  constructor(private userRepository: UserRepository) {}
  department: string;
  async validate(
    value: any,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    this.department = validationArguments.constraints['department'];
    const currentUser = await this.userRepository
      .findOne({
        _id: (JSON.parse(validationArguments.object['currentUser']) as User)
          ._id,
      })
      .populate('department');
    // constraints will be passed from the decorator inside the input DTO
    if (
      currentUser.department['name'] !==
      validationArguments.constraints['department']
    )
      return false;
    return true;
  }

  defaultMessage() {
    return `the user department must be ${this.department}`;
  }
}

export function IsUserDepartment(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: validationOptions.context,
      validator: IsUserDepartmentConstraint,
    });
  };
}
