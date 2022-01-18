import { GroupRepository } from '../../src/group/group.repository';

export const GroupRepo = (): GroupRepository => global.groupRepository;
