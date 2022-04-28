import { LeaveRepository } from '../../src/leave/leave.repository';

export const leaveTestRepo = (): LeaveRepository => global.leaveRepository;
