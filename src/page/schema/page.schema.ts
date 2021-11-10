import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type PageDocument = Page & Document;

@Schema({ versionKey: false, timestamps: true })
export class Page {
  _id?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  admin: ObjectId;

  @Prop({ type: [Types.ObjectId] })
  likes: ObjectId[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
