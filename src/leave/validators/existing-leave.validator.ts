import { Injectable } from '@nestjs/common';
import { LeaveRepository } from '../leave.repository';
import { ObjectId } from 'mongoose';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingLeaveConstraint implements ValidatorConstraintInterface {
  constructor(private leaveRepository: LeaveRepository) {}
  async validate(_id: ObjectId): Promise<boolean> {
    const leave = await this.leaveRepository.findOne({ _id });
    if (!leave) return false;
    return true;
  }

  defaultMessage() {
    return "this leave request doesn't exist";
  }
}

export function IsExistingLeave(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingLeaveConstraint,
    });
  };
}
