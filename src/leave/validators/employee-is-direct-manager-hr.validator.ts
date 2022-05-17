import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import { LeaveRepository } from '../repositories/leave.repository';
import { ObjectId } from 'mongoose';
import { User } from '../../user/schema/user.schema';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsDirectManagerOrHRConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    private userRepository: UserRepository,
    private leaveRepository: LeaveRepository,
  ) {}

  error: string;

  async validate(
    leaveId: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const leave = await this.leaveRepository
      .findOne({ _id: leaveId })
      .populate('employee');
    // this is done because there is no way to guarantee execution order in class validator
    // so there is no way to guarantee IsExistingLeave is run before this validator
    //  please review this
    // https://github.com/typestack/class-validator/issues/134
    if (!leave) return true;
    const currentUser = await this.userRepository
      .findOne({
        _id: (JSON.parse(validationArguments.object['currentUser']) as User)
          ._id,
      })
      .populate('department');
    if (
      `${leave.employee['directManagerId']}` !== `${currentUser._id}` &&
      currentUser.department['name'] !== 'HR'
    )
      return false;
    return true;
  }

  defaultMessage() {
    return 'only the direct manager of the employee or HR department is allowed for this action';
  }
}

export function IsDirectManagerOrHR(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDirectManagerOrHRConstraint,
    });
  };
}
