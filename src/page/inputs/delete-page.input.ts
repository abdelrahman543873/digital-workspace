import { IsMongoId } from 'class-validator';

export class DeletePageInput {
  @IsMongoId()
  pageId: string;
}
