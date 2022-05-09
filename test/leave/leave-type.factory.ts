import { name, date, datatype } from 'faker';
import { LeaveType } from '../../src/leave/schema/leave-type.schema';
import { leaveTypeTestRepo } from './leave-type-test-repo';

interface LeavenTypeType {
  name?: string;
  accrual?: string;
  startingMonth?: number;
  maximumDays?: number;
  effectiveDate?: Date;
}

export const buildLeaveTypeParams = (
  obj: LeavenTypeType = {},
): LeavenTypeType => {
  return {
    name: obj.name || name.title(),
    accrual: obj.accrual || name.jobTitle(),
    startingMonth: obj.startingMonth || datatype.number(12),
    maximumDays: obj.maximumDays || datatype.number(),
    effectiveDate: obj.effectiveDate || date.future(),
  };
};

export const leaveTypesFactory = async (
  count = 10,
  obj: LeavenTypeType = {},
): Promise<LeaveType[]> => {
  const leaveTypes: LeavenTypeType[] = [];
  for (let i = 0; i < count; i++) {
    leaveTypes.push(buildLeaveTypeParams(obj));
  }
  return await leaveTypeTestRepo().addMany(leaveTypes);
};

export const leaveTypeFactory = async (
  obj: LeavenTypeType = {},
): Promise<LeaveType> => {
  const params: LeavenTypeType = buildLeaveTypeParams(obj);
  return await leaveTypeTestRepo().add(params);
};
