import { AuthGuard } from './../shared/guards/auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { CreateGroupInput } from './inputs/create-group.input';

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
}
