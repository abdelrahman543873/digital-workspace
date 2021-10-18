import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class LikePostInput {
  @IsMongoId()
  postId: ObjectId;
}
