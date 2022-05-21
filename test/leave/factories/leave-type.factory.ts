import { name } from 'faker';
import { LeaveType } from '../../../src/leave/schema/leave-type.schema';
import { leaveTypeTestRepo } from '../test-repos/leave-type-test-repo';

interface LeavenTypeType {
  name?: string;
  description?: string;
}

export const buildLeaveTypeParams = (
  obj: LeavenTypeType = {},
): LeavenTypeType => {
  return {
    name: obj.name || name.title(),
    description: obj.description || name.jobTitle(),
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
