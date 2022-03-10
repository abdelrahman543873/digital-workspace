import { PickType } from '@nestjs/swagger';
import { CreateLevelInput } from './create-level.input';

export class DeleteLevelInput extends PickType(CreateLevelInput, [
  'name',
] as const) {}
