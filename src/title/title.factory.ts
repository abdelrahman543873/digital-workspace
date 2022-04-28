import { name, datatype } from 'faker';
import { titleTestRepo } from '../../test/title/title-test-repo';
import { ObjectId } from 'mongoose';
import { departmentFactory } from '../../test/department/department.factory';
import { Title } from './schema/title.schema';

interface TitleType {
  name?: string;
  description?: string;
  department?: ObjectId;
}

export const buildTitleParams = async (
  obj: TitleType = {},
): Promise<TitleType> => {
  return {
    name: obj.name || datatype.uuid(),
    description: obj.description || name.jobDescriptor(),
    department: obj.department || (await departmentFactory())._id,
  };
};

export const titlesFactory = async (
  count = 10,
  obj: TitleType = {},
): Promise<Title[]> => {
  const skills: TitleType[] = [];
  for (let i = 0; i < count; i++) {
    skills.push(await buildTitleParams(obj));
  }
  return await titleTestRepo().addMany(skills);
};

export const titleFactory = async (obj: TitleType = {}): Promise<Title> => {
  const params: TitleType = await buildTitleParams(obj);
  return await titleTestRepo().add(params);
};
