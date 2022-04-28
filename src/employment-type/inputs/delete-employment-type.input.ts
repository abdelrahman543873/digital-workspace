import { PickType } from '@nestjs/swagger';
import { UpdateEmploymentTypeInput } from './update-employment-type.input';

export class DeleteEmploymentTypeInput extends PickType(
  UpdateEmploymentTypeInput,
  ['id'],
) {}
