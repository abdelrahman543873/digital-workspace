import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'LeaveBalanceValidator' })
@Injectable()
export class LeaveBalanceValidator implements ValidatorConstraintInterface {
  validate(text: string, validationArguments: ValidationArguments): boolean {
    const currentUser = JSON.parse(validationArguments.object['currentUser']);
    const endDate = new Date(validationArguments.object['endDate']).getTime();
    const startDate = new Date(text).getTime();
    const diffTime = Math.ceil(
      Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24),
    );
    if (currentUser.leaveBalance < diffTime) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `your leave balance is less than the number of days you are requesting`;
  }
}
