import { IsMongoId } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { AddUserInput } from './add-user.input';

export class UpdateUserByIdInput extends PartialType(AddUserInput) {
  @IsMongoId()
  userId: string;
}
