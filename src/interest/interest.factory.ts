import { name, datatype } from 'faker';
import { Department } from '../department/schema/department.schema';
import { interestTestRepo } from '../../test/interest/interest-test-repo';
import { Interest } from './schema/interest.schema';

interface InterestType {
  name?: string;
  description?: string;
}

export const buildInterestParams = (obj: InterestType = {}): InterestType => {
  return {
    name: obj.name || datatype.uuid(),
    description: obj.description || name.jobDescriptor(),
  };
};

export const interestsFactory = async (
  count = 10,
  obj: InterestType = {},
): Promise<Interest[]> => {
  const skills: InterestType[] = [];
  for (let i = 0; i < count; i++) {
    skills.push(buildInterestParams(obj));
  }
  return await interestTestRepo().addMany(skills);
};

export const interestFactory = async (
  obj: InterestType = {},
): Promise<Interest> => {
  const params: InterestType = buildInterestParams(obj);
  return await interestTestRepo().add(params);
};
