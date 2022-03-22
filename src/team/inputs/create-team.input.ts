import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Validate,
  IsOptional,
} from 'class-validator';
import { UniqueNameValidator } from '../validators/unique-name.validator';

export class CreateTeamInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  @Validate(UniqueNameValidator)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  description?: string;
}
