import { User } from './schema/user.schema';
import { ObjectId } from 'mongoose';
import { date, internet, name, phone, random } from 'faker';
import { GENDER, WIDGETS } from '../app.const';

export interface UserType {
  email?: string;
  password?: string;
  username?: string;
  phone?: string;
  experience?: string;
  description?: string;
  profilePic?: string;
  coverPic?: string;
  gender?: string;
  birthDate?: Date;
  directManagerId?: ObjectId;
  widgets?: string[];
  following?: ObjectId[];
  followers?: ObjectId[];
}

export const buildUserParams = (obj: UserType = {}): User => {
  return {
    email: obj.email || internet.email(),
    password: obj.password || internet.password(),
    username: obj.username || name.firstName(),
    phone: obj.phone || phone.phoneNumber(),
    experience: obj.experience || name.jobTitle(),
    description: obj.description || name.jobDescriptor(),
    profilePic: obj.profilePic || `${process.env.HOST}defaults/avatar.jpg`,
    coverPic: obj.coverPic || `${process.env.HOST}defaults/avatar.jpg`,
    gender: obj.gender || random.arrayElement(GENDER),
    birthDate: obj.birthDate || date.past(),
    directManagerId: obj.directManagerId || null,
    widgets: obj.widgets || random.arrayElements(WIDGETS),
    followers: obj.followers || [],
    following: obj.following || [],
  };
};
