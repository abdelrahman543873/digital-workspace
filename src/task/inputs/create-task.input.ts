import { Allow, IsDefined, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { PRIORITIES } from '../../app.const';
import { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';

export class CreateTaskInput {
  @IsDefined()
  @Transform(mongoIdTransform)
  assignee: ObjectId;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsIn(PRIORITIES)
  priority: string;

  @Allow()
  attachments: string[];

  @Allow()
  logo: string[];
}
