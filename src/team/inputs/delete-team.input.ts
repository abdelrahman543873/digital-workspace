import { PickType } from '@nestjs/swagger';
import { UpdateTeamInput } from './update-team.input';

export class DeleteTeamInput extends PickType(UpdateTeamInput, ['id']) {}
