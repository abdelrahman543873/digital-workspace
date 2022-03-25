import { PartialType } from '@nestjs/swagger';
import { IsMongoId, Validate } from 'class-validator';
import { CreateTeamInput } from './create-team.input';
import { ExistingTeamId } from '../validators/existing-team.validator';

export class UpdateTeamInput extends PartialType(CreateTeamInput) {
  @IsMongoId()
  @Validate(ExistingTeamId)
  id: string;
}
