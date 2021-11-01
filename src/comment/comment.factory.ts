import * as faker from 'faker';
import { postFactory } from './../post/post.factory';
import { ObjectId } from 'mongoose';
import { userFactory } from '../user/user.factory';
import { Comment } from './schema/comment.schema';
import { CommentRepo } from '../../test/comment/comment-test-repo';

interface CommentType {
  commenter?: ObjectId;
  post?: ObjectId;
  comment?: ObjectId;
  content?: string;
  likes?: ObjectId[];
}

export const buildCommentParams = async (
  obj: CommentType = {},
): Promise<Comment> => {
  const userId = (await userFactory())._id;
  return {
    comment: obj.comment || null,
    post: obj.post || (await postFactory())._id,
    content: obj.content || faker.random.words(),
    likes: obj.likes || [userId],
    commenter: obj.commenter || userId,
  };
};

export const commentsFactory = async (
  count = 10,
  obj: CommentType = {},
): Promise<Comment[]> => {
  const comments: Comment[] = [];
  for (let i = 0; i < count; i++) {
    comments.push(await buildCommentParams(obj));
  }
  return (await CommentRepo()).addMany(comments);
};

export const commentFactory = async (
  obj: CommentType = {},
): Promise<Comment> => {
  const params: Comment = await buildCommentParams(obj);
  return (await CommentRepo()).add(params);
};
