import { IsMongoId } from 'class-validator';

export class LikePostInput {
  @IsMongoId()
  postId: string;
}
