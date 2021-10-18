import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { AddPostInput } from './inputs/add-post.input';
import { BaseRepository } from '../shared/generics/repository.abstract';

@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(@InjectModel(Post.name) private postSchema: Model<PostDocument>) {
    super(postSchema);
  }

  async addPost(userId: ObjectId, input: AddPostInput) {
    return await this.postSchema.create({ ...input, userId });
  }
}
