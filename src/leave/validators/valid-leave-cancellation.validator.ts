import { Injectable } from '@nestjs/common';
import { LeaveRepository } from '../repositories/leave.repository';
import { LEAVE_STATUS } from '../leave.enum';
import { User } from '../../user/schema/user.schema';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'ValidLeaveCancellationValidator', async: true })
@Injectable()
export class ValidLeaveCancellationValidator
  implements ValidatorConstraintInterface
{
  constructor(private leaveRepository: LeaveRepository) {}
  error: string;
  async validate(
    text: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const currentUser: User = JSON.parse(
      validationArguments.object['currentUser'],
    );
    const leave = await this.leaveRepository.findOne({
      employee: new Types.ObjectId(`${currentUser._id}`),
      _id: text,
    });
    if (!leave) {
      this.error = "this leave request doesn't exist";
      return false;
    } else if (
      leave.status === LEAVE_STATUS.APPROVED &&
      leave.startDate < new Date()
    ) {
      this.error = "you can't cancel this leave request now";
      return false;
    }
    return true;
  }

  defaultMessage() {
    return this.error;
  }
}
