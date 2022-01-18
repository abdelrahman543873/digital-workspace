import { TaskRepository } from '../../src/task/task.repository';

export const TaskRepo = (): TaskRepository => global.taskRepository;
