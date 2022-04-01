import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { ExistingTitleId } from '../validators/existing-title-id.validator';

export class CreateTitleInput {
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  @Validate(ExistingTitleId)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  description?: string;
}
