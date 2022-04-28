import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmentRepository } from './department.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Department, DepartmentSchema } from './schema/department.schema';
import { UniqueDepartmentName } from './validators/unique-department-name.validator';
import { ExistingDepartmentId } from './validators/existing-department-id.validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
  ],
  controllers: [DepartmentController],
  providers: [
    DepartmentService,
    DepartmentRepository,
    UniqueDepartmentName,
    ExistingDepartmentId,
  ],
})
export class DepartmentModule {}
