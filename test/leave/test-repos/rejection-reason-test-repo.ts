import { RejectionReasonRepository } from '../../../src/leave/repositories/rejection-reason.repository';

export const rejectionReasonTestRepo = (): RejectionReasonRepository =>
  global.rejectionReasonRepository;
