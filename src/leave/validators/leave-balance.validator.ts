import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'LeaveBalanceValidator' })
@Injectable()
export class LeaveBalanceValidator implements ValidatorConstraintInterface {
  error: string;
  validate(
    startingDate: string,
    validationArguments: ValidationArguments,
  ): boolean {
    const currentUser = JSON.parse(validationArguments.object['currentUser']);
    const endDate = new Date(validationArguments.object['endDate']).getTime();
    const startDate = new Date(startingDate).getTime();
    const diffTime = Math.ceil(
      Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24),
    );
    if (currentUser.leaveBalance < diffTime) {
      this.error = "You don't have enough balance to complete this request";
      return false;
    } else if (
      new Date(startingDate) >= new Date(validationArguments.object['endDate'])
    ) {
      this.error = "start date can't be bigger than or equal to end date";
      return false;
    }
    return true;
  }

  defaultMessage() {
    return this.error;
  }
}
