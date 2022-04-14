import { random } from 'faker';
import { skillTestRepo } from '../skill/skill-test-repo';
import { LeaveReason } from '../../src/leave/schema/reason.schema';
import { leaveReasonTestRepo } from './leave-reason-test-repo';

interface LeaveReasonType {
  reason?: string;
}

export const buildLeaveReasonParams = (
  obj: LeaveReasonType = {},
): LeaveReasonType => {
  return {
    reason: obj.reason || random.words(),
  };
};

export const leaveReasonsFactory = async (
  count = 10,
  obj: LeaveReasonType = {},
): Promise<LeaveReason[]> => {
  const leaveReasons: LeaveReasonType[] = [];
  for (let i = 0; i < count; i++) {
    leaveReasons.push(buildLeaveReasonParams(obj));
  }
  return await leaveReasonTestRepo().addMany(leaveReasons);
};

export const leaveReasonFactory = async (
  obj: LeaveReasonType = {},
): Promise<LeaveReason> => {
  const params: LeaveReasonType = buildLeaveReasonParams(obj);
  return await leaveReasonTestRepo().add(params);
};
