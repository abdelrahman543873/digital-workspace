import { LeaveTypeRepository } from '../../../src/leave/repositories/leave-type.repository';

export const leaveTypeTestRepo = (): LeaveTypeRepository =>
  global.leaveTypeRepository;
