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
    const endDate = new Date(validationArguments.object['endDate']);
    const startDate = new Date(validationArguments.object['startDate']);
    const diffTime = Math.ceil(
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (currentUser.leaveBalance < diffTime) {
      this.error = "You don't have enough balance to complete this request";
      return false;
    } else if (startDate >= endDate) {
      this.error = "start date can't be bigger than or equal to end date";
      return false;
    }
    return true;
  }

  defaultMessage() {
    return this.error;
  }
}
