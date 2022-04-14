import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'LeaveBalanceValidator', async: true })
export class LeaveBalanceValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(
    text: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    console.log(validationArguments);
    //     const department = await this.teamsRepository.findTeamByName(text);
    //     if (department) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `team's name ${args.value} already exists`;
  }
}
