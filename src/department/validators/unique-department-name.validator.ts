import { Injectable } from '@nestjs/common';
import { DepartmentService } from '../department.service';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'UniqueDepartmentName', async: true })
export class UniqueDepartmentName implements ValidatorConstraintInterface {
  constructor(private departmentService: DepartmentService) {}

  async validate(text: string): Promise<boolean> {
    const department = await this.departmentService.findDepartment({
      name: text,
    });
    if (department) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} department already exists`;
  }
}
