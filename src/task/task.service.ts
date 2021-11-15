import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskInput } from './inputs/create-task.input';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { GetTasksInput } from './inputs/get-tasks.input';

@Injectable()
export class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async createTask(input: CreateTaskInput) {
    return await this.taskRepository.createTask(
      this.request.currentUser._id,
      input,
    );
  }

  async getTasks(input: GetTasksInput) {
    return await this.taskRepository.getTasks(
      this.request.currentUser._id,
      input,
    );
  }
}
