import { name } from 'faker';
import { Level } from './schema/level.schema';
import { LevelRepo } from '../../test/level/level-test-repo';

interface LevelType {
  name?: string;
  description?: string;
}

export const buildLevelParams = (obj: LevelType = {}): LevelType => {
  return {
    name: obj.name || name.jobType(),
    description: obj.description || name.jobDescriptor(),
  };
};

export const levelsFactory = async (
  count = 10,
  obj: LevelType = {},
): Promise<Level[]> => {
  const levels: LevelType[] = [];
  for (let i = 0; i < count; i++) {
    levels.push(buildLevelParams(obj));
  }
  return await LevelRepo().addMany(levels);
};

export const levelFactory = async (obj: LevelType = {}): Promise<Level> => {
  const params: LevelType = buildLevelParams(obj);
  return await LevelRepo().add(params);
};
