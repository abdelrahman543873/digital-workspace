import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class PostCommentInput {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  postId: string;
}
