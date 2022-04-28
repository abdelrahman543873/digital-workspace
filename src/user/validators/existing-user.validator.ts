import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { ObjectId } from 'mongoose';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'ExistingUserValidator', async: true })
export class ExistingUserValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(userId: ObjectId): Promise<boolean> {
    const user = await this.userRepository.findOne({ _id: userId });
    if (!user) return false;
    return true;
  }

  defaultMessage() {
    return "user id doesn't exist";
  }
}
