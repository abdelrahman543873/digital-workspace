import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { AddPostInput } from './inputs/add-post.input';

@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(Post.name) private postSchema: Model<PostDocument>,
  ) {}

  async addPost(input: AddPostInput) {
    return await this.postSchema.create(input);
  }
}
