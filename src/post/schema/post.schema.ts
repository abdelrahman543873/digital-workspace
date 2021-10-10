import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ versionKey: false })
export class Post {
  @Prop()
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
