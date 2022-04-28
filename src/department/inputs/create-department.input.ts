import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { UniqueDepartmentName } from '../validators/unique-department-name.validator';

export class CreateDepartmentInput {
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  @Validate(UniqueDepartmentName)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  description?: string;
}
