import { PartialType } from '@nestjs/swagger';
import { IsMongoId, Validate } from 'class-validator';
import { ExistingSkillId } from '../validators/existing-skill-id.validator';
import { CreateSkillInput } from './create-skill.input';

export class UpdateSkillInput extends PartialType(CreateSkillInput) {
  @IsMongoId()
  @Validate(ExistingSkillId)
  id: string;
}
