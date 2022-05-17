import { LEAVE_STATUS } from '../leave.enum';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsLeaveRequirementsMetConstraint
  implements ValidatorConstraintInterface
{
  error: string;
  validate(
    status: LEAVE_STATUS,
    validationArguments?: ValidationArguments,
  ): boolean {
    if (
      status === LEAVE_STATUS.REJECTED &&
      (!validationArguments.object['rejectionJustification'] ||
        !validationArguments.object['rejectionReason'])
    ) {
      this.error =
        'you have to enter rejection justification and rejection reason id';
      return false;
    } else if (
      status !== LEAVE_STATUS.REJECTED &&
      (validationArguments.object['rejectionJustification'] ||
        validationArguments.object['rejectionReason'])
    ) {
      this.error =
        "you can't enter rejection justification or rejection reason id when leave isn't rejected";
      return false;
    }
    return true;
  }

  defaultMessage() {
    return this.error;
  }
}

export function IsLeaveRequirementsMet(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLeaveRequirementsMetConstraint,
    });
  };
}
