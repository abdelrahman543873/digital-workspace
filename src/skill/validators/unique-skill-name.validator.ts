import { Injectable } from '@nestjs/common';
import { SkillRepository } from '../skill.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'UniqueSkillName', async: true })
export class UniqueSkillName implements ValidatorConstraintInterface {
  constructor(private skillRepository: SkillRepository) {}

  async validate(text: string): Promise<boolean> {
    const skill = await this.skillRepository.findSkill({
      name: text,
    });
    if (skill) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} skill already exists`;
  }
}
