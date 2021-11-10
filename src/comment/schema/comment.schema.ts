import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ versionKey: false, timestamps: true })
export class Comment {
  _id?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  commenter: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Post' })
  post: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Comment' })
  comment: ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [Types.ObjectId] })
  likes: ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
