import { Injectable } from '@nestjs/common';
import { LeaveTypeRepository } from '../repositories/leave-type.repository';
import {
  registerDecorator,
  ValidationOptions,
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
export function IsExistingLeaveType(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: LeaveTypeValidator,
    });
  };
}
