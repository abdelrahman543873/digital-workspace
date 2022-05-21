import { random, datatype, date } from 'faker';
import { ObjectId } from 'mongoose';
import { ACCRUAL_ENUM } from '../../../src/leave/leave.enum';
import { getValuesFromEnum } from '../../../src/shared/utils/columnEnum';
import { countryFactory } from '../../../src/country/country.factory';
import { departmentFactory } from '../../department/department.factory';
import { EmploymentTypeFactory } from '../../../src/employment-type/employment-type.factory';
import { GENDER } from '../../../src/app.const';
import { LeaveCriteria } from '../../../src/leave/schema/leave-criteria.schema';
import { leaveTypeFactory } from './leave-type.factory';
import { leaveCriteriaRepo } from '../test-repos/leave-criteria.repo';

interface LeaveCriteriaType {
  leaveType?: ObjectId;
  accrual?: string;
  startingMonth?: number;
  maximumDays?: number;
  effectiveDate?: Date;
  countries?: ObjectId[];
  departments?: ObjectId[];
  employmentTypes?: ObjectId[];
  gender?: string;
  isCarriedOver?: boolean;
  isHolidaysIncluded?: boolean;
  isContinuousAllowed?: boolean;
  isNegativeBalanceAllowed?: boolean;
  isAttachmentAllowed?: boolean;
}

export const buildLeaveCriteriaParams = async (
  obj: LeaveCriteriaType = {},
): Promise<LeaveCriteriaType> => {
  return {
    leaveType: obj.leaveType || (await leaveTypeFactory())._id,
    accrual:
      obj.accrual || random.arrayElement(getValuesFromEnum(ACCRUAL_ENUM)),
    startingMonth: obj.startingMonth || datatype.number(12),
    maximumDays: obj.maximumDays || datatype.number(),
    effectiveDate: obj.effectiveDate || date.future(),
    countries: obj.countries || [(await countryFactory())._id],
    departments: obj.departments || [(await departmentFactory())._id],
    employmentTypes: obj.employmentTypes || [
      (await EmploymentTypeFactory())._id,
    ],
    gender: obj.gender || random.arrayElement(GENDER),
    isCarriedOver: obj.isCarriedOver || null,
    isHolidaysIncluded: obj.isHolidaysIncluded || null,
    isContinuousAllowed: obj.isContinuousAllowed || null,
    isNegativeBalanceAllowed: obj.isNegativeBalanceAllowed || null,
    isAttachmentAllowed: obj.isAttachmentAllowed || null,
  };
};

export const leaveCriteriaFactory = async (
  obj: LeaveCriteriaType = {},
): Promise<LeaveCriteria> => {
  const params: LeaveCriteriaType = await buildLeaveCriteriaParams(obj);
  return await leaveCriteriaRepo().add(params);
};
