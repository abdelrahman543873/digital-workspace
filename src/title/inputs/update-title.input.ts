import { PartialType } from '@nestjs/swagger';
import { IsMongoId, Validate } from 'class-validator';
import { CreateTitleInput } from './create-title.input';
import { ExistingTitleId } from '../validators/existing-title-id.validator';

export class UpdateTitleInput extends PartialType(CreateTitleInput) {
  @IsMongoId()
  @Validate(ExistingTitleId)
  id: string;
}
