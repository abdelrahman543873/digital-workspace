import { name, datatype } from 'faker';
import { Department } from '../department/schema/department.schema';
import { skillTestRepo } from '../../test/skill/skill-test-repo';

interface SkillType {
  name?: string;
  description?: string;
}

export const buildSkillParams = (obj: SkillType = {}): SkillType => {
  return {
    name: obj.name || datatype.uuid(),
    description: obj.description || name.jobDescriptor(),
  };
};

export const skillsFactory = async (
  count = 10,
  obj: SkillType = {},
): Promise<Department[]> => {
  const skills: SkillType[] = [];
  for (let i = 0; i < count; i++) {
    skills.push(buildSkillParams(obj));
  }
  return await skillTestRepo().addMany(skills);
};

export const skillFactory = async (
  obj: SkillType = {},
): Promise<Department> => {
  const params: SkillType = buildSkillParams(obj);
  return await skillTestRepo().add(params);
};
