import { GroupRepo } from './../../test/group/group-test-repo';
import { ObjectId } from 'mongoose';
import { userFactory } from '../user/user.factory';
import { name } from 'faker';
import { Group } from './schema/group.schema';

interface GroupType {
  admin?: ObjectId;
  name?: string;
  members?: ObjectId[];
}

export const buildGroupParams = async (obj: GroupType = {}): Promise<Group> => {
  const userId = (await userFactory())._id;
  return {
    name: obj.name || name.title(),
    admin: obj.admin || userId,
    members: obj.members || [userId],
  };
};

export const groupsFactory = async (
  count = 10,
  obj: GroupType = {},
): Promise<Group[]> => {
  const groups: Group[] = [];
  for (let i = 0; i < count; i++) {
    groups.push(await buildGroupParams(obj));
  }
  return await GroupRepo().addMany(groups);
};

export const groupFactory = async (obj: GroupType = {}): Promise<Group> => {
  const params: Group = await buildGroupParams(obj);
  return await GroupRepo().add(params);
};
