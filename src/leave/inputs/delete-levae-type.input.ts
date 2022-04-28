import { Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { mongoIdTransform } from '../../shared/utils/mongo-id.transform';

export class DeleteLeaveTypeInput {
  @IsDefined()
  @Transform(mongoIdTransform)
  id: string;
}
