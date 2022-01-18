import { TeamRepository } from '../../src/team/team.repository';

export const TeamRepo = (): TeamRepository => global.teamRepository;
