import { AuthGuard } from './../shared/guards/auth.guard';
import { TaskService } from './task.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Query,
  Put,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CreateTaskInput } from './inputs/create-task.input';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetTasksInput } from './inputs/get-tasks.input';
import { UpdateTaskInput } from './inputs/update-task.input';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { CreateTaskSwagger } from './swagger/create-task.swagger';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiBearerAuth()
  @ApiTags('task')
  @UseGuards(AuthGuard)
  @ApiBody(CreateTaskSwagger)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'attachments', maxCount: 10 },
      { name: 'logo', maxCount: 1 },
    ]),
  )
  @Post('create')
  async createTask(
    @Body() input: CreateTaskInput,
    @UploadedFiles()
    files: {
      attachments?: Express.Multer.File[];
      logo?: Express.Multer.File[];
    },
  ) {
    return await this.taskService.createTask(input, files);
  }

  @ApiBearerAuth()
  @ApiTags('task')
  @UseGuards(AuthGuard)
  @Get('tasks')
  async getTasks(@Query() input: GetTasksInput) {
    return await this.taskService.getTasks(input);
  }

  @ApiBearerAuth()
  @ApiTags('task')
  @UseGuards(AuthGuard)
  @Put('update')
  async updateTask(@Body() input: UpdateTaskInput) {
    return await this.taskService.updateTask(input);
  }
}
