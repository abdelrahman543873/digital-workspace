import { moduleRef } from '../before-test-run';
import { TeamRepository } from '../../src/team/team.repository';

export const TeamRepo = async (): Promise<TeamRepository> =>
  (await moduleRef()).get<TeamRepository>(TeamRepository);
