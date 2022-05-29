import { LeaveUserRepository } from '../../../src/leave/repositories/leave-user.repository';
export const leaveUserTestRepo = (): LeaveUserRepository =>
  global.leaveUserRepository;
