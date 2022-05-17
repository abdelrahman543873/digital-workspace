import { LeaveRepository } from '../../../src/leave/repositories/leave.repository';

export const leaveTestRepo = (): LeaveRepository => global.leaveRepository;
