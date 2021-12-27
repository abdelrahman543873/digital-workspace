import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskInput } from './inputs/create-task.input';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { GetTasksInput } from './inputs/get-tasks.input';
import { UpdateTaskInput } from './inputs/update-task.input';
import { GetTaskByIdInput } from './inputs/get-task-by-id.input';
import { ApplyForLeaveInput } from './inputs/apply-for-leave.input';
import { UserRepository } from '../user/user.repository';
import { BaseHttpException } from '../shared/exceptions/base-http-exception';
import { ManageLeaveInput } from './inputs/manage-leave.input';
import { TASK_STATUS } from '../app.const';

@Injectable()
export class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository,
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

  async getTask(input: GetTaskByIdInput) {
    return await this.taskRepository.getTask(input);
  }

  async updateTask(input: UpdateTaskInput) {
    return await this.taskRepository.updateTask(
      this.request.currentUser._id,
      input,
    );
  }

  async getTaskStats() {
    return await this.taskRepository.getTaskStats(this.request.currentUser._id);
  }

  async applyForLeave(
    input: ApplyForLeaveInput,
    files: {
      attachments?: Express.Multer.File[];
    },
  ) {
    if (input.leaveDays > this.request.currentUser.leaveBalance)
      throw new BaseHttpException(this.request.lang, 612);
    if (!this.request.currentUser.directManagerId)
      throw new BaseHttpException(this.request.lang, 610);
    const directManager = await this.userRepository.getUserById({
      id: this.request.currentUser.directManagerId.toString(),
    });
    if (!directManager) throw new BaseHttpException(this.request.lang, 608);
    return await this.taskRepository.applyForLeave(
      input,
      this.request.currentUser.directManagerId,
      files,
    );
  }

  async manageLeave(input: ManageLeaveInput) {
    const leave = await this.taskRepository.manageLeave(
      this.request.currentUser._id,
      input,
    );
    if (!leave) throw new BaseHttpException(this.request.lang, 611);
    if (input.status === TASK_STATUS[0])
      await this.userRepository.subtractLeaveDays(
        leave.assigner,
        leave.leaveDays,
      );
    return leave;
  }
}
