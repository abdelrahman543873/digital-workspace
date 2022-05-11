import { Body, Controller, Post, UseGuards, Get, Query } from '@nestjs/common';
import { AddRoleInput } from './inputs/add-role.input';
import { RoleService } from './role.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '../shared/utils/pagination.input';

@ApiTags('role')
@Controller('role')
@UseGuards(AuthGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  async addRole(@Body() input: AddRoleInput) {
    return await this.roleService.addRole(input);
  }

  @Get()
  async getRolesList(@Query() input: Pagination) {
    return await this.roleService.getRolesList(input);
  }
}
