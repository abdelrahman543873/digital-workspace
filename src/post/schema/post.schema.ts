import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ versionKey: false })
export class Post {
  _id?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [Types.ObjectId] })
  likes: ObjectId[];

  @Prop([String])
  attachments: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
