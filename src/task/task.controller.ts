import { AuthGuard } from './../shared/guards/auth.guard';
import { TaskService } from './task.service';
import { Body, Controller, Post, UseGuards, Get, Query } from '@nestjs/common';
import { CreateTaskInput } from './inputs/create-task.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetTasksInput } from './inputs/get-tasks.input';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiBearerAuth()
  @ApiTags('task')
  @UseGuards(AuthGuard)
  @Post('create')
  async createTask(@Body() input: CreateTaskInput) {
    return await this.taskService.createTask(input);
  }

  @ApiBearerAuth()
  @ApiTags('task')
  @UseGuards(AuthGuard)
  @Get('tasks')
  async getTasks(@Query() input: GetTasksInput) {
    return await this.taskService.getTasks(input);
  }
}
