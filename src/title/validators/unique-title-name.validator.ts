import { Injectable } from '@nestjs/common';
import { TitleRepository } from '../title.repository';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'UniqueTitleName', async: true })
export class UniqueTitleName implements ValidatorConstraintInterface {
  constructor(private titleRepository: TitleRepository) {}

  async validate(text: string): Promise<boolean> {
    const title = await this.titleRepository.findTitle({
      name: text,
    });
    if (title) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} title already exists`;
  }
}
