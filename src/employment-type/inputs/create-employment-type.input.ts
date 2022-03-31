import { UniqueEmploymentTypeName } from '../validators/unique-employment-type-name.validator';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

export class CreateEmploymentTypeInput {
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  @Validate(UniqueEmploymentTypeName)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  description?: string;
}
