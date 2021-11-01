import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class ManageLikeCommentInput {
  @IsMongoId()
  commentId: ObjectId;
}
