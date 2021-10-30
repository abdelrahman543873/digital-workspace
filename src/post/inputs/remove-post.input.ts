import { IsMongoId } from 'class-validator';

export class RemovePostInput {
  @IsMongoId()
  postId: string;
}
