import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, Min } from 'class-validator';
import { AddUserInput } from './add-user.input';

export class UpdateUserInput extends PartialType(AddUserInput) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Min(8)
  newPassword?: string;
}
