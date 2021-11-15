import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId, Types } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { Task, TaskDocument } from './schema/task.schema';
import { CreateTaskInput } from './inputs/create-task.input';
import { GetTasksInput } from './inputs/get-tasks.input';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  constructor(
    @InjectModel(Task.name)
    private taskSchema: AggregatePaginateModel<TaskDocument>,
  ) {
    super(taskSchema);
  }

  async createTask(userId: ObjectId, input: CreateTaskInput) {
    return await this.taskSchema.create({
      ...input,
      assigner: userId,
      assignee: new Types.ObjectId(input.assignee),
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
    ]);
    return await this.taskSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }
}
