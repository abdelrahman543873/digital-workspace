import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema({ versionKey: false, timestamps: true })
export class Skill {
  _id?: ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
