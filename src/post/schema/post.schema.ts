import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ versionKey: false })
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: ObjectId;

  @Prop()
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
