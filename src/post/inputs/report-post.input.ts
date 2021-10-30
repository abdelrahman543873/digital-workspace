import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';

export class ReportPostInput {
  @IsMongoId()
  postId: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
