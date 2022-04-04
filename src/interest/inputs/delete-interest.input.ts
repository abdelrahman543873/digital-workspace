import { PickType } from '@nestjs/swagger';
import { UpdateInterestInput } from './update-interest.input';

export class DeleteInterestInput extends PickType(UpdateInterestInput, [
  'id',
]) {}
