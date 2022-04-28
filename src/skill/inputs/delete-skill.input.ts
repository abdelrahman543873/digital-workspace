import { PickType } from '@nestjs/swagger';
import { UpdateSkillInput } from './update-skill.input';

export class DeleteSkillInput extends PickType(UpdateSkillInput, ['id']) {}
