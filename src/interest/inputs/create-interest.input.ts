import { UniqueInterestName } from '../validators/unique-interest-name.validator';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

export class CreateInterestInput {
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  @Validate(UniqueInterestName)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  description?: string;
}
