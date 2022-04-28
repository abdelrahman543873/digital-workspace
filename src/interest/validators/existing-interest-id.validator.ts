import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { InterestRepository } from '../interest.repository';

@Injectable()
@ValidatorConstraint({ name: 'ExistingInterestId', async: true })
export class ExistingInterestId implements ValidatorConstraintInterface {
  constructor(private interestRepository: InterestRepository) {}

  async validate(text: string): Promise<boolean> {
    const interest = await this.interestRepository.findInterest({
      id: text,
    });
    if (!interest) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `interest id ${args.value} doesn't exist`;
  }
}
