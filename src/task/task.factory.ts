import { ObjectId } from 'mongoose';
import { userFactory } from '../user/user.factory';
import { commerce, name, random, datatype } from 'faker';
import { Task } from './schema/task.schema';
import { PRIORITIES, TASK_STATUS } from '../app.const';
import { TaskRepo } from '../../test/task/task-test-repo';

interface TaskType {
  assigner?: ObjectId;
  assignee?: ObjectId;
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  attachments?: string[];
  logo?: string;
  leaveDays?: number;
}

export const buildTaskParams = async (obj: TaskType = {}): Promise<Task> => {
  const userId = (await userFactory())._id;
  return {
    assigner: obj.assigner || userId,
    assignee: obj.assignee || userId,
    title: obj.title || name.title(),
    description: obj.description || commerce.productDescription(),
    priority: obj.priority || random.arrayElement(PRIORITIES),
    status: obj.status || random.arrayElement(TASK_STATUS),
    attachments: obj.attachments || [],
    logo: obj.logo || `${process.env.HOST}avatar.jpg`,
    // 25 is the max number of leave days allowed for an employee
    leaveDays: obj.leaveDays || datatype.number({ min: 0, max: 25 }),
  };
};

export const tasksFactory = async (
  count = 10,
  obj: TaskType = {},
): Promise<Task[]> => {
  const tasks: Task[] = [];
  for (let i = 0; i < count; i++) {
    tasks.push(await buildTaskParams(obj));
  }
  return await TaskRepo().addMany(tasks);
};

export const taskFactory = async (obj: TaskType = {}): Promise<Task> => {
  const params: Task = await buildTaskParams(obj);
  return await TaskRepo().add(params);
};
