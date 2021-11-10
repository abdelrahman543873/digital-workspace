import { IsMongoId } from 'class-validator';

export class ManageLikePageInput {
  @IsMongoId()
  pageId: string;
}
