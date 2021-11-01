import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class DeleteCommentInput {
  @IsMongoId()
  commentId: ObjectId;
}
