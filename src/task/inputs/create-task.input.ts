import { IsIn, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { PRIORITIES } from '../../app.const';

export class CreateTaskInput {
  @IsMongoId()
  assignee: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsIn(PRIORITIES)
  priority: string;
}
