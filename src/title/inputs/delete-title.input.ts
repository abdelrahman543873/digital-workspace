import { PickType } from '@nestjs/swagger';
import { UpdateTitleInput } from './update-title.input';

export class DeleteTitleInput extends PickType(UpdateTitleInput, ['id']) {}
