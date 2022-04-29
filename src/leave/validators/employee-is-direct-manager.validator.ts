import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import { LeaveRepository } from '../leave.repository';
import { ObjectId } from 'mongoose';
import { User } from '../../user/schema/user.schema';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'EmployeeIsDirectManagerValidator', async: true })
@Injectable()
export class EmployeeIsDirectManagerValidator
  implements ValidatorConstraintInterface
{
  constructor(
    private userRepository: UserRepository,
    private leaveRepository: LeaveRepository,
  ) {}

  error: string;

  async validate(
    leaveId: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const leave = await this.leaveRepository.findOne({ _id: leaveId });
    if (!leave) {
      this.error = "this leave id doesn't exist";
      return false;
    }
    const employee = await this.userRepository.findOne({ _id: leave.employee });
    const currentUser: User = JSON.parse(
      validationArguments.object['currentUser'],
    );
    if (`${employee.directManagerId}` !== `${currentUser._id}`) {
      this.error =
        'only the direct manager of the employee is allowed for this action';
      return false;
    }
    return true;
  }

  defaultMessage() {
    return this.error;
  }
}
