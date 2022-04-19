import { ActiveUserGuard } from './../shared/guards/active-user.guard';
import { FileCloudUploadInterceptor } from './../shared/interceptors/file-cloud-upload.interceptor';
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
  Param,
} from '@nestjs/common';
import { CreateTaskInput } from './inputs/create-task.input';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiTags,
} from '@nestjs/swagger';
import { GetTasksInput } from './inputs/get-tasks.input';
import { UpdateTaskInput } from './inputs/update-task.input';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateTaskSwagger } from './swagger/create-task.swagger';
import { GetTaskByIdInput } from './inputs/get-task-by-id.input';
import { ApplyForLeaveInput } from './inputs/apply-for-leave.input';
import { ManageLeaveInput } from './inputs/manage-leave.input';

@UseGuards(ActiveUserGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiBearerAuth()
  @ApiTags('task')
  @UseGuards(AuthGuard)
  @ApiBody(CreateTaskSwagger)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileCloudUploadInterceptor)
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
  @Get('taskStats')
  async getTaskStats() {
    return await this.taskService.getTaskStats();
  }

  @ApiBearerAuth()
  @ApiTags('task')
  @UseGuards(AuthGuard)
  @Get(':taskId')
  async getTask(@Param() input: GetTaskByIdInput) {
    return await this.taskService.getTask(input);
  }

  @ApiBearerAuth()
  @ApiTags('task')
  @UseGuards(AuthGuard)
  @Put('update')
  async updateTask(@Body() input: UpdateTaskInput) {
    return await this.taskService.updateTask(input);
  }

  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @ApiTags('task')
  @UseGuards(AuthGuard)
  @Put('manageLeave')
  async manageLeave(@Body() input: ManageLeaveInput) {
    return await this.taskService.manageLeave(input);
  }

  @ApiExcludeEndpoint()
  @ApiBearerAuth()
  @ApiTags('task')
  @UseGuards(AuthGuard)
  @Post('applyForLeave')
  @UseInterceptors(FileCloudUploadInterceptor)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'attachments', maxCount: 10 }]),
  )
  async applyForLeave(
    @Body() input: ApplyForLeaveInput,
    @UploadedFiles()
    files: {
      attachments?: Express.Multer.File[];
    },
  ) {
    return await this.taskService.applyForLeave(input, files);
  }
}
