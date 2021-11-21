import { User, Experience, Skill, Education } from './schema/user.schema';
import { ObjectId, Types } from 'mongoose';
import { address, datatype, date, internet, name, phone, random } from 'faker';
import { GENDER, WIDGETS } from '../app.const';
interface ExperienceType {
  startDate?: Date;
  endDate?: Date;
  position?: string;
  name?: string;
  logo?: string;
}

interface EducationType {
  startDate?: Date;
  endDate?: Date;
  level?: string;
  name?: string;
  logo?: string;
}

interface SkillType {
  name?: string;
  percentage?: number;
}

export interface UserType {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
  experience?: Experience[];
  education?: Education[];
  skill?: Skill[];
  description?: string;
  profilePic?: string;
  coverPic?: string;
  gender?: string;
  birthDate?: Date;
  directManagerId?: Types.ObjectId;
  widgets?: string[];
  following?: ObjectId[];
  followers?: ObjectId[];
  currentPosition?: string;
  nationality?: string;
}

const buildExperienceParams = (obj: ExperienceType = {}): Experience => {
  return {
    name: obj.name || name.title(),
    logo: obj.logo || `${process.env.HOST}defaults/avatar.jpg`,
    position: obj.position || name.jobTitle(),
    endDate: obj.endDate || date.future(),
    startDate: obj.startDate || date.past(),
  };
};

const buildEducationParams = (obj: EducationType = {}): Education => {
  return {
    name: obj.name || name.title(),
    logo: obj.logo || `${process.env.HOST}defaults/avatar.jpg`,
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
    fullName: obj.fullName || `${name.firstName()} ${name.lastName()}`,
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
    currentPosition: obj.currentPosition || name.jobTitle(),
    nationality: obj.nationality || address.country(),
  };
};
