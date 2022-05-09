import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { ObjectId } from 'mongoose';
import { User } from '../schema/user.schema';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ name: 'DirectManagerIdValidator', async: true })
export class DirectManagerIdValidator implements ValidatorConstraintInterface {
  error: string;
  constructor(private userRepository: UserRepository) {}

  async validate(
    directManagerId: ObjectId,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    let currentUser: User;
    if (validationArguments.object['currentUser'])
      currentUser = JSON.parse(validationArguments.object['currentUser']);
    const directManager = await this.userRepository.findOne({
      _id: directManagerId,
    });
    if (currentUser && `${directManagerId}` === `${currentUser._id}`) {
      this.error = "your id can't be the direct manager id";
      return false;
    } else if (!directManager) {
      this.error = "user id doesn't exist";
      return false;
    }
    return true;
  }

  defaultMessage() {
    return this.error;
  }
}
