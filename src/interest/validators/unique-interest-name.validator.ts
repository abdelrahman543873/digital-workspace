import { Injectable } from '@nestjs/common';
import { InterestRepository } from '../interest.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'UniqueInterestName', async: true })
export class UniqueInterestName implements ValidatorConstraintInterface {
  constructor(private interestRepository: InterestRepository) {}

  async validate(text: string): Promise<boolean> {
    const interest = await this.interestRepository.findInterest({
      name: text,
    });
    if (interest) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} interest already exists`;
  }
}
