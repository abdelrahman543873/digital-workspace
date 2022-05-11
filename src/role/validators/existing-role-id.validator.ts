import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../role.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'ExistingRoleIdValidator', async: true })
export class ExistingRoleIdValidator implements ValidatorConstraintInterface {
  constructor(private roleRepository: RoleRepository) {}

  async validate(text: string): Promise<boolean> {
    const role = await this.roleRepository.findOne({
      _id: text,
    });
    if (!role) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `role id ${args.value} doesn't exist`;
  }
}
