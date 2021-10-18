import * as faker from 'faker';
import { Post } from './schema/post.schema';
import { PostRepo } from '../../test/post/post-test-repo';
import { ObjectId } from 'mongoose';
import { userFactory } from '../user/user.factory';

interface PostType {
  userId?: ObjectId;
  content?: string;
  likes?: ObjectId[];
}

export const buildPostParams = async (obj: PostType = {}): Promise<Post> => {
  return {
    content: obj.content || faker.random.word(),
    userId: obj.userId || (await userFactory())._id,
    likes: obj.likes || [(await userFactory())._id],
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
