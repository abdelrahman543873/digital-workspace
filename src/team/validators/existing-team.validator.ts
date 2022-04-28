import { Injectable } from '@nestjs/common';
import { TeamRepository } from '../team.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'ExistingTeamId', async: true })
export class ExistingTeamId implements ValidatorConstraintInterface {
  constructor(private departmentService: TeamRepository) {}

  async validate(id: string): Promise<boolean> {
    const team = await this.departmentService.findTeamById(id);
    if (!team) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `team id ${args.value} doesn't exist`;
  }
}
