import { UpdateDepartmentInput } from './update-department.input';
import { PickType } from '@nestjs/swagger';

export class DeleteDepartmentInput extends PickType(UpdateDepartmentInput, [
  'id',
]) {}
