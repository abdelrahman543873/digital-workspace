import { moduleRef } from '../before-test-run';
import { GroupRepository } from '../../src/group/group.repository';

export const GroupRepo = async (): Promise<GroupRepository> =>
  (await moduleRef()).get<GroupRepository>(GroupRepository);
