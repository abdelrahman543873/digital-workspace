import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class PostCommentInput {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  postId: ObjectId;
}
