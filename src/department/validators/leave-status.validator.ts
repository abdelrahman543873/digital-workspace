import { Injectable } from '@nestjs/common';
import { User } from '../../user/schema/user.schema';
import { DepartmentRepository } from '../department.repository';
import { LEAVE_STATUS } from '../../leave/leave.enum';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'LeaveStatusValidator', async: true })
@Injectable()
export class LeaveStatusValidator implements ValidatorConstraintInterface {
  constructor(private departmentRepository: DepartmentRepository) {}

  error: string;

  async validate(
    status: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const currentUser: User = JSON.parse(
      validationArguments.object['currentUser'],
    );
    const department = await this.departmentRepository.findOne({
      _id: currentUser.department,
    });
    if (
      department.name === 'Human Resources' &&
      status === LEAVE_STATUS.MANAGER_APPROVED
    ) {
      this.error =
        'this status is only allowed for the manager of this employee';
      return false;
    }
    if (
      department.name !== 'Human Resources' &&
      status === LEAVE_STATUS.APPROVED
    ) {
      this.error =
        'this status is only allowed for the human resources department';
      return false;
    }
    return true;
  }

  defaultMessage() {
    return this.error;
  }
}
