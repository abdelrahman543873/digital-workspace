import { Experience, Education } from './schema/user.schema';
import { ObjectId, Types } from 'mongoose';
import { address, datatype, date, internet, name, phone, random } from 'faker';
import { GENDER, WIDGETS } from '../app.const';
import { countryFactory } from '../country/country.factory';
import { levelFactory } from '../level/level.factory';
import { departmentFactory } from '../../test/department/department.factory';
import { EmploymentTypeFactory } from '../employment-type/employment-type.factory';
import { skillFactory } from '../skill/skill.factory';
import { titleFactory } from '../title/title.factory';
import { interestFactory } from '../interest/interest.factory';
import { getValuesFromEnum } from '../shared/utils/columnEnum';
import { STATUS, BLOOD_TYPE, MARTIAL_STATUS } from './user.enum';
interface ExperienceType {
  startDate?: Date;
  endDate?: Date;
  position?: string;
  name?: string;
  logo?: string;
}

interface EducationType {
  logo?: string;
  university?: string;
  major?: string;
  level?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface UserType {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
  experience?: Experience[];
  education?: Education[];
  description?: string;
  profilePic?: string;
  coverPic?: string;
  gender?: string;
  birthDate?: string;
  directManagerId?: Types.ObjectId | ObjectId;
  widgets?: string[];
  following?: ObjectId[];
  followers?: ObjectId[];
  hiddenPosts?: ObjectId[];
  nationality?: string;
  position?: string;
  isCompany?: boolean;
  isAdmin?: boolean;
  twitter?: string;
  linkedin?: string;
  microsoftToken?: string;
  leaveBalance?: number;
  country?: ObjectId;
  level?: ObjectId;
  department?: ObjectId;
  employmentType?: ObjectId;
  skills?: ObjectId[];
  title?: ObjectId;
  interests?: ObjectId[];
  status?: STATUS;
  governmentalId?: string;
  visa?: string;
  address?: string;
  visaExpiryDate?: Date;
  emergencyContactNumber?: string;
  bloodGroup?: BLOOD_TYPE;
  martialStatus?: MARTIAL_STATUS;
  weddingDate?: Date;
  yearsOfExperience?: number;
}

const buildExperienceParams = (obj: ExperienceType = {}): Experience => {
  return {
    name: obj.name || name.title(),
    logo: obj.logo || `${process.env.HOST}avatar.jpg`,
    position: obj.position || name.jobTitle(),
    endDate: obj.endDate || date.future(),
    startDate: obj.startDate || date.past(),
  };
};

const buildEducationParams = (obj: EducationType = {}): Education => {
  return {
    university: obj.university || name.title(),
    major: obj.major || name.title(),
    logo: obj.logo || `${process.env.HOST}avatar.jpg`,
    level: obj.level || name.jobTitle(),
    endDate: obj.endDate || date.future(),
    startDate: obj.startDate || date.past(),
  };
};

export const buildUserParams = async (
  obj: UserType = {},
): Promise<UserType> => {
  return {
    email: obj.email || internet.email(),
    password: obj.password || internet.password(),
    fullName: obj.fullName || `${name.firstName()} ${name.lastName()}`,
    phone: obj.phone || phone.phoneNumber('010091#####'),
    experience: obj.experience || [buildExperienceParams()],
    description: obj.description || name.jobDescriptor(),
    profilePic: obj.profilePic || `${process.env.HOST}avatar.jpg`,
    coverPic: obj.coverPic || `${process.env.HOST}avatar.jpg`,
    gender: obj.gender || random.arrayElement(GENDER),
    birthDate: obj.birthDate || date.past().toISOString(),
    directManagerId: obj.directManagerId || null,
    widgets: obj.widgets || random.arrayElements(WIDGETS),
    followers: obj.followers || [],
    following: obj.following || [],
    education: obj.education || [buildEducationParams()],
    nationality: obj.nationality || address.countryCode(),
    hiddenPosts: obj.hiddenPosts || [],
    position: obj.position || name.jobTitle(),
    isCompany: obj.isCompany || false,
    isAdmin: obj.isAdmin || false,
    linkedin: obj.linkedin || internet.url(),
    twitter: obj.twitter || internet.url(),
    microsoftToken: obj.microsoftToken || '',
    leaveBalance: obj.leaveBalance || datatype.number(25),
    country: obj.country || (await countryFactory())._id,
    level: obj.level || (await levelFactory())._id,
    department: obj.department || (await departmentFactory())._id,
    employmentType: obj.employmentType || (await EmploymentTypeFactory())._id,
    skills: obj.skills || [(await skillFactory())._id],
    interests: obj.interests || [(await interestFactory())._id],
    title: obj.title || (await titleFactory())._id,
    status: obj.status || STATUS.ACTIVE,
    governmentalId: obj.governmentalId || datatype.uuid(),
    visa: obj.visa || datatype.uuid(),
    address: obj.address || address.city(),
    visaExpiryDate: obj.visaExpiryDate || date.future(),
    emergencyContactNumber: obj.emergencyContactNumber || phone.phoneNumber(),
    bloodGroup:
      obj.bloodGroup ||
      (random.arrayElement(getValuesFromEnum(BLOOD_TYPE)) as BLOOD_TYPE),
    martialStatus:
      obj.martialStatus ||
      (random.arrayElement(
        getValuesFromEnum(MARTIAL_STATUS),
      ) as MARTIAL_STATUS),
    weddingDate: obj.weddingDate || date.future(),
    yearsOfExperience: obj.yearsOfExperience || datatype.number(),
  };
};
