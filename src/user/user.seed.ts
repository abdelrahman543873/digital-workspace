import { User, Experience, Skill, Education } from './schema/user.schema';
import { ObjectId } from 'mongoose';
import { datatype, date, internet, name, phone, random } from 'faker';
import { GENDER, WIDGETS } from '../app.const';
interface ExperienceType {
  startDate?: Date;
  endDate?: Date;
  position?: string;
}

interface EducationType {
  startDate?: Date;
  endDate?: Date;
  level?: string;
}

interface SkillType {
  name?: string;
  percentage?: number;
}

export interface UserType {
  email?: string;
  password?: string;
  username?: string;
  phone?: string;
  experience?: Experience[];
  education?: Education[];
  skill?: Skill[];
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

const buildExperienceParams = (obj: ExperienceType = {}): Experience => {
  return {
    position: obj.position || name.jobTitle(),
    endDate: obj.endDate || date.future(),
    startDate: obj.startDate || date.past(),
  };
};

const buildEducationParams = (obj: EducationType = {}): Education => {
  return {
    level: obj.level || name.jobTitle(),
    endDate: obj.endDate || date.future(),
    startDate: obj.startDate || date.past(),
  };
};

const buildSkillParams = (obj: SkillType = {}): Skill => {
  return {
    name: obj.name || name.jobTitle(),
    percentage: obj.percentage || datatype.number(100),
  };
};

export const buildUserParams = (obj: UserType = {}): User => {
  return {
    email: obj.email || internet.email(),
    password: obj.password || internet.password(),
    username: obj.username || name.firstName(),
    phone: obj.phone || phone.phoneNumber(),
    experience: obj.experience || [buildExperienceParams()],
    description: obj.description || name.jobDescriptor(),
    profilePic: obj.profilePic || `${process.env.HOST}defaults/avatar.jpg`,
    coverPic: obj.coverPic || `${process.env.HOST}defaults/avatar.jpg`,
    gender: obj.gender || random.arrayElement(GENDER),
    birthDate: obj.birthDate || date.past(),
    directManagerId: obj.directManagerId || null,
    widgets: obj.widgets || random.arrayElements(WIDGETS),
    followers: obj.followers || [],
    following: obj.following || [],
    education: obj.education || [buildEducationParams()],
    skill: obj.skill || [buildSkillParams()],
  };
};
