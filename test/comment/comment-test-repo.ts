import { moduleRef } from '../before-test-run';
import { CommentRepository } from '../../src/comment/comment.repository';

export const CommentRepo = async (): Promise<CommentRepository> =>
  (await moduleRef()).get<CommentRepository>(CommentRepository);
