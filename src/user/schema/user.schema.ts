import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { GENDER } from '../../app.const';

export type UserDocument = User & Document;

@Schema({ versionKey: false, _id: false })
export class Experience {
  @Prop()
  logo: string;

  @Prop()
  name: string;

  @Prop()
  position: string;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

const ExperienceSchema = SchemaFactory.createForClass(Experience);

@Schema({ versionKey: false, _id: false })
export class Education {
  @Prop()
  logo: string;

  @Prop()
  name: string;

  @Prop()
  level: string;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

const EducationSchema = SchemaFactory.createForClass(Education);

@Schema({ versionKey: false, _id: false })
export class Skill {
  @Prop()
  percentage: number;

  @Prop()
  name: string;
}

const SkillSchema = SchemaFactory.createForClass(Skill);
@Schema({ versionKey: false, timestamps: true })
export class User {
  _id?: ObjectId;

  token?: string;

  @Prop({ unique: true, required: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ sparse: true })
  phone: string;

  @Prop()
  username: string;

  @Prop({ type: [ExperienceSchema] })
  experience: Experience[];

  @Prop({ type: [EducationSchema] })
  education: Education[];

  @Prop({ type: [SkillSchema] })
  skill: Skill[];

  @Prop()
  description: string;

  @Prop()
  profilePic: string;

  @Prop()
  coverPic: string;

  @Prop({ enum: GENDER })
  gender: string;

  @Prop({ type: [String] })
  widgets: string[];

  @Prop({ type: Date })
  birthDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  directManagerId: ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  followers: ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  following: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
