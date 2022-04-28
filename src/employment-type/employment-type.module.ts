import { Module } from '@nestjs/common';
import { EmploymentTypeController } from './employment-type.controller';
import { EmploymentTypeService } from './employment-type.service';
import { EmploymentTypeRepository } from './employment-type.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmploymentType,
  EmploymentTypeSchema,
} from './schema/employment-type.schema';
import { UniqueEmploymentTypeName } from './validators/unique-employment-type-name.validator';
import { ExistingEmploymentTypeId } from './validators/existing-employment-type-id.validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmploymentType.name, schema: EmploymentTypeSchema },
    ]),
  ],
  controllers: [EmploymentTypeController],
  providers: [
    EmploymentTypeService,
    EmploymentTypeRepository,
    UniqueEmploymentTypeName,
    ExistingEmploymentTypeId,
  ],
})
export class EmploymentTypeModule {}
