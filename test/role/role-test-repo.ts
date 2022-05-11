import { RoleRepository } from '../../src/role/role.repository';

export const roleTestRepo = (): RoleRepository => global.roleRepository;
