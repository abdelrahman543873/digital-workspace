import { IsMongoId } from 'class-validator';

export class ManageLikeCommentInput {
  @IsMongoId()
  commentId: string;
}
