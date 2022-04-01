import { Injectable } from '@nestjs/common';
import { SkillRepository } from '../skill.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'ExistingSkillId', async: true })
export class ExistingSkillId implements ValidatorConstraintInterface {
  constructor(private skillRepository: SkillRepository) {}

  async validate(text: string): Promise<boolean> {
    const skill = await this.skillRepository.findSkill({
      id: text,
    });
    if (!skill) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `skill id ${args.value} doesn't exist`;
  }
}
