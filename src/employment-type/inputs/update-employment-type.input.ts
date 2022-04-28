import { PartialType } from '@nestjs/swagger';
import { IsMongoId, Validate } from 'class-validator';
import { ExistingEmploymentTypeId } from '../validators/existing-employment-type-id.validator';
import { CreateEmploymentTypeInput } from './create-employment-type.input';

export class UpdateEmploymentTypeInput extends PartialType(
  CreateEmploymentTypeInput,
) {
  @IsMongoId()
  @Validate(ExistingEmploymentTypeId)
  id: string;
}
