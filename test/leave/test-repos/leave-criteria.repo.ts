import { LeaveCriteriaRepository } from '../../../src/leave/repositories/leave-criteria.repository';

export const leaveCriteriaRepo = (): LeaveCriteriaRepository =>
  global.leaveCriteriaRepository;
