import { Injectable } from '@nestjs/common';
import { LeaveTypeRepository } from '../repositories/leave-type.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'LeaveTypeValidator', async: true })
@Injectable()
export class LeaveTypeValidator implements ValidatorConstraintInterface {
  constructor(private leaveTypeRepository: LeaveTypeRepository) {}
  async validate(text: string): Promise<boolean> {
    const leaveType = await this.leaveTypeRepository.findOne({ _id: text });
    if (!leaveType) return false;
    return true;
  }

  defaultMessage() {
    return "this leave type doesn't exist";
  }
}
