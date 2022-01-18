import { PostRepository } from '../../src/post/post.repository';

export const PostRepo = (): PostRepository => global.postRepository;
