import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type LevelDocument = Level & Document;

@Schema({ versionKey: false, timestamps: true })
export class Level {
  _id?: ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
