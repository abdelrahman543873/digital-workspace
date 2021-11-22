import { IsMongoId } from 'class-validator';

export class HidePostInput {
  @IsMongoId()
  postId: string;
}
