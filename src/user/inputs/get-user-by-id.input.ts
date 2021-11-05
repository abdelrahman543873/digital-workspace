import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetUserByIdInput {
  @IsMongoId()
  id: ObjectId;
}
