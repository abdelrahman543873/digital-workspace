import * as faker from 'faker';
import { Post } from './schema/post.schema';
import { PostRepo } from '../../test/post/post-test-repo';

interface PostType {
  content?: string;
}

export const buildPostParams = (obj: PostType = {}): Post => {
  return {
    content: obj.content || faker.random.word(),
  };
};

export const postsFactory = async (
  count = 10,
  obj: PostType = {},
): Promise<Post[]> => {
  const posts: Post[] = [];
  for (let i = 0; i < count; i++) {
    posts.push(buildPostParams(obj));
  }
  return (await PostRepo()).addMany(posts);
};

export const faqFactory = async (obj: PostType = {}): Promise<Post> => {
  const params: Post = buildPostParams(obj);
  return (await PostRepo()).add(params);
};
