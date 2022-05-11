import { datatype } from 'faker';
import { Role } from './schema/role.schema';
import { roleTestRepo } from '../../test/role/role-test-repo';

interface RoleType {
  name?: string;
}

export const buildRoleParams = (obj: RoleType = {}): RoleType => {
  return {
    name: obj.name || datatype.uuid(),
  };
};

export const rolesFactory = async (
  count = 10,
  obj: RoleType = {},
): Promise<Role[]> => {
  const roles: RoleType[] = [];
  for (let i = 0; i < count; i++) {
    roles.push(buildRoleParams(obj));
  }
  return await roleTestRepo().addMany(roles);
};

export const roleFactory = async (obj: RoleType = {}): Promise<Role> => {
  const params: RoleType = buildRoleParams(obj);
  return await roleTestRepo().add(params);
};
