import { Injectable } from '@nestjs/common';
import { TitleRepository } from '../title.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'ExistingTitleId', async: true })
export class ExistingTitleId implements ValidatorConstraintInterface {
  constructor(private titleRepository: TitleRepository) {}

  async validate(text: string): Promise<boolean> {
    const title = await this.titleRepository.findTitle({
      id: text,
    });
    if (!title) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `title id ${args.value} doesn't exist`;
  }
}
