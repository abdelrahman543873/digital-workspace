import * as faker from 'faker';
import { Post, Report } from './schema/post.schema';
import { PostRepo } from '../../test/post/post-test-repo';
import { ObjectId } from 'mongoose';
import { userFactory } from '../user/user.factory';

interface PostType {
  userId?: ObjectId;
  content?: string;
  likes?: ObjectId[];
  attachments?: string[];
  reports?: Report[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const buildPostParams = async (obj: PostType = {}): Promise<Post> => {
  const userId = (await userFactory())._id;
  return {
    content: obj.content || faker.random.word(),
    userId: obj.userId || userId,
    likes: obj.likes || [userId],
    attachments: obj.attachments || ['http://localhost:3000/download.jpg'],
    reports: obj.reports || [
      { userId, reason: faker.commerce.productDescription() },
    ],
    createdAt: obj.createdAt,
    updatedAt: obj.createdAt,
  };
};

export const postsFactory = async (
  count = 10,
  obj: PostType = {},
): Promise<Post[]> => {
  const posts: Post[] = [];
  for (let i = 0; i < count; i++) {
    posts.push(await buildPostParams(obj));
  }
  return (await PostRepo()).addMany(posts);
};

export const postFactory = async (obj: PostType = {}): Promise<Post> => {
  const params: Post = await buildPostParams(obj);
  return (await PostRepo()).add(params);
};
