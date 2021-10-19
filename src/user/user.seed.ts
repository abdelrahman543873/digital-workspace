import { User } from './schema/user.schema';
import { ObjectId } from 'mongoose';
import { date, image, internet, name, phone, random } from 'faker';
import { GENDER } from '../app.const';

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
}

export const buildUserParams = (obj: UserType = {}): User => {
  return {
    email: obj.email || internet.email(),
    password: obj.password || internet.password(),
    username: obj.username || internet.userName(),
    phone: obj.phone || phone.phoneNumber(),
    experience: obj.experience || name.jobTitle(),
    description: obj.description || name.jobDescriptor(),
    profilePic: obj.profilePic || image.imageUrl(),
    coverPic: obj.coverPic || image.imageUrl(),
    gender: obj.gender || random.arrayElement(GENDER),
    birthDate: obj.birthDate || date.past(),
    directManagerId: obj.directManagerId || null,
  };
};
