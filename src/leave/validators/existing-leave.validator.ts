import { Injectable } from '@nestjs/common';
import { LeaveRepository } from '../leave.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ExistingLeaveValidator', async: true })
@Injectable()
export class ExistingLeaveValidator implements ValidatorConstraintInterface {
  constructor(private leaveRepository: LeaveRepository) {}
  async validate(text: string): Promise<boolean> {
    const leave = await this.leaveRepository.findOne({ _id: text });
    if (!leave) return false;
    return true;
  }

  defaultMessage() {
    return "this leave request doesn't exist";
  }
}
