import { ObjectId } from 'mongoose';
import { userFactory } from '../user/user.factory';
import { commerce, name, random } from 'faker';
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
  return (await TaskRepo()).addMany(tasks);
};

export const taskFactory = async (obj: TaskType = {}): Promise<Task> => {
  const params: Task = await buildTaskParams(obj);
  return (await TaskRepo()).add(params);
};
