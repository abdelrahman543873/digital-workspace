import { IsMongoId } from 'class-validator';

export class GetTaskByIdInput {
  @IsMongoId()
  taskId: string;
}
