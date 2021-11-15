import { moduleRef } from '../before-test-run';
import { TaskRepository } from '../../src/task/task.repository';

export const TaskRepo = async (): Promise<TaskRepository> =>
  (await moduleRef()).get<TaskRepository>(TaskRepository);
