import { PartialType } from '@nestjs/swagger';
import { IsMongoId, Validate } from 'class-validator';
import { CreateInterestInput } from './create-interest.input';
import { ExistingInterestId } from '../validators/existing-interest-id.validator';

export class UpdateInterestInput extends PartialType(CreateInterestInput) {
  @IsMongoId()
  @Validate(ExistingInterestId)
  id: string;
}
