import { LeaveReasonRepository } from '../../src/leave/leave-reason.repository';

export const leaveReasonTestRepo = (): LeaveReasonRepository =>
  global.leaveReasonRepository;
