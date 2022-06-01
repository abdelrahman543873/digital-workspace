import { Injectable } from '@nestjs/common';
import { LeaveCriteriaRepository } from '../repositories/leave-criteria.repository';
import { ObjectId } from 'mongoose';
import { LeaveTypeRepository } from '../repositories/leave-type.repository';
import { User } from '../../user/schema/user.schema';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class UserLeaveCriteriaConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    private leaveTypeRepository: LeaveTypeRepository,
    private leaveCriteriaRepository: LeaveCriteriaRepository,
  ) {}
  async validate(
    type: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const leaveType = await this.leaveTypeRepository.findOne({ _id: type });
    // this is done to allow for the existing leave criteria validator to throw the error
    // TODO refactor this when class validator allows validators order
    if (!leaveType) return true;
    const currentUser: User = JSON.parse(
      validationArguments.object['currentUser'],
    );
    const userCriterions = (
      await this.leaveCriteriaRepository.getLeaveBalance(currentUser)
    ).map((criteria) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Unreachable code error
      criteria.leaveType._id.toString(),
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    if (!userCriterions.includes(type.toString())) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return "you don't fit the criteria for this leave";
  }
}
export function IsUserFittingCriteria(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserLeaveCriteriaConstraint,
    });
  };
}
