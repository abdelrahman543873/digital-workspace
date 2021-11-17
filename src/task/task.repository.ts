import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId, SchemaTypes, Types } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { Task, TaskDocument } from './schema/task.schema';
import { CreateTaskInput } from './inputs/create-task.input';
import { GetTasksInput } from './inputs/get-tasks.input';
import { UpdateTaskInput } from './inputs/update-task.input';
import { GetTaskByIdInput } from './inputs/get-task-by-id.input';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  constructor(
    @InjectModel(Task.name)
    private taskSchema: AggregatePaginateModel<TaskDocument>,
  ) {
    super(taskSchema);
  }

  async createTask(
    userId: ObjectId,
    input: CreateTaskInput,
    files: {
      attachments?: Express.Multer.File[];
      logo?: Express.Multer.File[];
    },
  ) {
    return await this.taskSchema.create({
      ...input,
      assigner: userId,
      assignee: new Types.ObjectId(input.assignee),
      ...(files?.attachments && {
        attachments: files.attachments.map((file) => {
          return `${process.env.HOST}tasks/${file.filename}`;
        }),
      }),
      ...(files?.logo && {
        logo: files.logo.map((file) => {
          return `${process.env.HOST}tasks/${file.filename}`;
        })[0],
      }),
    });
  }

  async getTask(input: GetTaskByIdInput) {
    return await this.taskSchema.findOne({
      _id: new Types.ObjectId(input.taskId),
    });
  }

  async getTasks(userId: ObjectId, input: GetTasksInput) {
    const chosenId = input.userId ? new Types.ObjectId(input.userId) : userId;
    const aggregation = this.taskSchema.aggregate([
      {
        $match: {
          $expr: {
            $eq: [chosenId, '$assignee'],
          },
        },
      },
      {
        $match: {
          ...(input.status && {
            $expr: {
              $eq: [input.status, '$status'],
            },
          }),
        },
      },
    ]);
    return await this.taskSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  async updateTask(userId: ObjectId, input: UpdateTaskInput) {
    const { taskId, assignee, ...filteredInput } = input;
    return await this.taskSchema.findOneAndUpdate(
      {
        assigner: userId,
        _id: new Types.ObjectId(taskId),
      },
      {
        ...filteredInput,
        ...(assignee && { assignee: new SchemaTypes.ObjectId(taskId) }),
      },
      { new: true },
    );
  }
}
