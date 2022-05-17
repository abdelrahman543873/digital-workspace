import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { RejectionReasonRepository } from '../repositories/rejection-reason.repository';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistingRejectionReasonConstraint
  implements ValidatorConstraintInterface
{
  constructor(private rejectionReasonRepository: RejectionReasonRepository) {}
  async validate(_id: ObjectId): Promise<boolean> {
    const rejectionReason = await this.rejectionReasonRepository.findOne({
      _id,
    });
    if (!rejectionReason) return false;
    return true;
  }

  defaultMessage() {
    return "this rejection reason id doesn't exist";
  }
}

export function IsExistingRejectionReason(
  validationOptions?: ValidationOptions,
) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingRejectionReasonConstraint,
    });
  };
}
