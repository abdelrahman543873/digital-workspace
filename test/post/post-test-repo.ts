import { moduleRef } from '../before-test-run';
import { PostRepository } from '../../src/post/post.repository';

export const PostRepo = async (): Promise<PostRepository> =>
  (await moduleRef()).get<PostRepository>(PostRepository);
