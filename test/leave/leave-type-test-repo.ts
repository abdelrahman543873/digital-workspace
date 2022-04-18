import { LeaveTypeRepository } from '../../src/leave/leave-type.repository';

export const leaveTypeTestRepo = (): LeaveTypeRepository =>
  global.leaveTypeRepository;
