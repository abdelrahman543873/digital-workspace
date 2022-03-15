import { PartialType } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { CreateLevelInput } from './create-level.input';

export class UpdateLevelInput extends PartialType(CreateLevelInput) {
  @IsMongoId()
  id: string;
}
