import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { UniqueTitleName } from '../validators/unique-title-name.validator';

export class CreateTitleInput {
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  @Validate(UniqueTitleName)
  name: string;

  @IsMongoId()
  department: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  description?: string;
}
