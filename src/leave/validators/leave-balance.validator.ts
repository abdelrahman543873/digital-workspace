import { Injectable } from '@nestjs/common';
import { LeaveUserRepository } from '../repositories/leave-user.repository';
import { LeaveRepository } from '../repositories/leave.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Types, ObjectId } from 'mongoose';
import { LeaveCriteriaRepository } from '../repositories/leave-criteria.repository';

@ValidatorConstraint({ name: 'LeaveBalanceValidator', async: true })
@Injectable()
export class LeaveBalanceValidator implements ValidatorConstraintInterface {
  constructor(
    private leaveUserRepository: LeaveUserRepository,
    private leaveCriteriaRepository: LeaveCriteriaRepository,
  ) {}
  error: string;
  async validate(
    startingDate: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const currentUser = JSON.parse(validationArguments.object['currentUser']);
    const criteriaId = validationArguments.object['type'] as ObjectId;
    const leaveCriteria = await this.leaveCriteriaRepository.findOne({
      _id: criteriaId,
    });
    // this is done to allow for the existing leave criteria validator to throw the error
    // TODO refactor this when class validator allows validators order
    if (!leaveCriteria) return true;
    const endDate = validationArguments.object['endDate'] as Date;
    const startDate = validationArguments.object['startDate'] as Date;
    const diffTime = Math.ceil(
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const numberOfAcquiredDays =
      await this.leaveUserRepository.numberOfAcquiredLeaveDays({
        user: new Types.ObjectId(currentUser._id),
        leaveType: validationArguments.object['type'],
      });
    if (numberOfAcquiredDays + diffTime > leaveCriteria.maximumDays) {
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
