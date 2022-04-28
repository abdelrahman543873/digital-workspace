import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { UniqueSkillName } from '../validators/unique-skill-name.validator';

export class CreateSkillInput {
  @IsString()
  @MaxLength(50)
  @MinLength(5)
  @Validate(UniqueSkillName)
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(300)
  description?: string;
}
