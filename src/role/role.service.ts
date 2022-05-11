import { Injectable } from '@nestjs/common';
import { AddRoleInput } from './inputs/add-role.input';
import { RoleRepository } from './role.repository';
import { Pagination } from '../shared/utils/pagination.input';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}
  addRole(input: AddRoleInput) {
    return this.roleRepository.addRole(input);
  }

  getRolesList(input: Pagination) {
    return this.roleRepository.getRolesList(input);
  }
}
