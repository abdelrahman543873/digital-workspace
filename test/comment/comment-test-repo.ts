import { CommentRepository } from '../../src/comment/comment.repository';

export const CommentRepo = (): CommentRepository => global.commentRepository;
