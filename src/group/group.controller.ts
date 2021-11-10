import { AuthGuard } from './../shared/guards/auth.guard';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Query,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { CreateGroupInput } from './inputs/create-group.input';
import { ManageJoinGroupInput } from './inputs/manage-join-group.input';
import { Pagination } from '../shared/utils/pagination.input';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiBearerAuth()
  @ApiTags('group')
  @UseGuards(AuthGuard)
  @Post('create')
  async createGroup(@Body() input: CreateGroupInput) {
    return await this.groupService.createGroup(input);
  }

  @ApiBearerAuth()
  @ApiTags('group')
  @UseGuards(AuthGuard)
  @Put('manageJoin')
  async manageJoinGroup(@Body() input: ManageJoinGroupInput) {
    return await this.groupService.manageJoinGroup(input);
  }

  @ApiBearerAuth()
  @ApiTags('group')
  @UseGuards(AuthGuard)
  @Get('joinedGroups')
  async getJoinedGroups(@Query() pagination: Pagination) {
    return await this.groupService.getJoinedGroups(pagination);
  }
}
