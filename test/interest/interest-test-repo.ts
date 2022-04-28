import { InterestRepository } from '../../src/interest/interest.repository';

export const interestTestRepo = (): InterestRepository =>
  global.interestRepository;
