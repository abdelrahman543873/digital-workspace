import { random } from 'faker';
import { LeaveType } from '../../src/leave/schema/leave-type.schema';
import { leaveTypeTestRepo } from './leave-type-test-repo';

interface LeavenTypeType {
  reason?: string;
}

export const buildLeaveTypeParams = (
  obj: LeavenTypeType = {},
): LeavenTypeType => {
  return {
    reason: obj.reason || random.words(),
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
