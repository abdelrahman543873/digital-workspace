import { PartialType } from '@nestjs/swagger';
import { IsMongoId, Validate } from 'class-validator';
import { UniqueTitleName } from '../validators/unique-title-name.validator';
import { CreateTitleInput } from './create-title.input';

export class UpdateTitleInput extends PartialType(CreateTitleInput) {
  @IsMongoId()
  @Validate(UniqueTitleName)
  id: string;
}
