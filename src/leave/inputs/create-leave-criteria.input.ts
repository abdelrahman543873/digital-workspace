import { getValuesFromEnum } from '../../shared/utils/columnEnum';
import { ACCRUAL_ENUM } from '../leave.enum';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsDateString,
  IsIn,
  Min,
  IsBoolean,
  Max,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import {
  mongoIdTransform,
  mongoIdArrayTransform,
} from '../../shared/utils/mongo-id.transform';
import { IsExistingLeaveType } from '../validators/leave-type.validator';
import { IsExistingCountry } from '../../country/validators/isExistingCountry.validator';
import { IsExistingDepartment } from '../../department/validators/existing-department-id.validator';
import { IsExistingEmploymentType } from '../../employment-type/validators/existing-employment-type-id.validator';
import { GENDER } from '../../app.const';

export class CreateLeaveCriteriaInput {
  @IsExistingLeaveType()
  @Transform(mongoIdTransform)
  leaveType: ObjectId;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  @IsIn(getValuesFromEnum(ACCRUAL_ENUM))
  accrual?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(12)
  startingMonth?: number;

  @IsNumber()
  maximumDays: number;

  @IsOptional()
  @IsDateString()
  effectiveDate?: Date;

  @IsOptional()
  @IsExistingCountry({ each: true })
  @Transform(mongoIdArrayTransform)
  countries?: ObjectId[];

  @IsOptional()
  @IsExistingDepartment({ each: true })
  @Transform(mongoIdArrayTransform)
  departments?: ObjectId[];

  @IsOptional()
  @IsExistingEmploymentType({ each: true })
  @Transform(mongoIdArrayTransform)
  employmentTypes?: ObjectId[];

  @IsOptional()
  @IsIn(GENDER)
  gender?: string;

  @IsOptional()
  @IsBoolean()
  isCarriedOver?: boolean;

  @IsOptional()
  @IsBoolean()
  isHolidaysIncluded?: boolean;

  @IsOptional()
  @IsBoolean()
  isContinuousAllowed?: boolean;

  @IsOptional()
  @IsBoolean()
  isNegativeBalanceAllowed?: boolean;

  @IsOptional()
  @IsBoolean()
  isAttachmentAllowed?: boolean;
}
