import { Injectable } from '@nestjs/common';
import { TeamRepository } from '../team.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'UniqueNameValidator', async: true })
export class UniqueNameValidator implements ValidatorConstraintInterface {
  constructor(private teamsRepository: TeamRepository) {}

  async validate(text: string): Promise<boolean> {
    const department = await this.teamsRepository.findTeamByName(text);
    if (department) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `team's name ${args.value} already exists`;
  }
}
