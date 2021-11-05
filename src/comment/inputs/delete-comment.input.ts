import { IsMongoId } from 'class-validator';

export class DeleteCommentInput {
  @IsMongoId()
  commentId: string;
}
