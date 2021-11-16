import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskInput } from './inputs/create-task.input';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { GetTasksInput } from './inputs/get-tasks.input';
import { UpdateTaskInput } from './inputs/update-task.input';

@Injectable()
export class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async createTask(
    input: CreateTaskInput,
    files: {
      attachments?: Express.Multer.File[];
      logo?: Express.Multer.File[];
    },
  ) {
    return await this.taskRepository.createTask(
      this.request.currentUser._id,
      input,
      files,
    );
  }

  async getTasks(input: GetTasksInput) {
    return await this.taskRepository.getTasks(
      this.request.currentUser._id,
      input,
    );
  }

  async updateTask(input: UpdateTaskInput) {
    return await this.taskRepository.updateTask(
      this.request.currentUser._id,
      input,
    );
  }
}
