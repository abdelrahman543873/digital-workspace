import { LEAVE_STATUS } from '../leave.enum';
import {
  isString,
  minLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsLeaveRejectedConstraint implements ValidatorConstraintInterface {
  error: string;
  validate(
    rejectionJustification: string,
    validationArguments?: ValidationArguments,
  ): boolean {
    if (
      rejectionJustification &&
      validationArguments.object['status'] !== LEAVE_STATUS.REJECTED
    ) {
      this.error =
        'the leave status has to be rejected to have a rejection reason';
      return false;
    } else if (
      !rejectionJustification &&
      validationArguments.object['status'] === LEAVE_STATUS.REJECTED
    ) {
      this.error = 'you have to enter rejection justification';
      return false;
    } else if (
      rejectionJustification &&
      (!isString(rejectionJustification) ||
        !minLength(rejectionJustification, 5))
    ) {
      this.error = 'rejection reason has to be a string of length 5 minimum';
      return false;
    }
    return true;
  }

  defaultMessage() {
    return this.error;
  }
}

export function IsLeaveRejected(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLeaveRejectedConstraint,
    });
  };
}
