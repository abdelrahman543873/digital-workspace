import { PartialType } from '@nestjs/swagger';
import { IsMongoId, Validate } from 'class-validator';
import { CreateDepartmentInput } from './create-department.input';
import { ExistingDepartmentId } from '../validators/existing-department-id.validator';

export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @IsMongoId()
  @Validate(ExistingDepartmentId)
  id: string;
}
