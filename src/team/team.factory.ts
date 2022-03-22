import { TeamRepo } from './../../test/team/team-test-repo';
import { ObjectId } from 'mongoose';
import { userFactory } from '../user/user.factory';
import { name } from 'faker';
import { Team } from './schema/team.schema';

interface TeamType {
  admin?: ObjectId;
  name?: string;
  members?: ObjectId[];
  description?: string;
}

export const buildTeamParams = async (obj: TeamType = {}): Promise<Team> => {
  const userId = (await userFactory())._id;
  return {
    name: obj.name || name.title(),
    description: obj.description || name.title(),
    admin: obj.admin || userId,
    members: obj.members || [userId],
  };
};

export const teamsFactory = async (
  count = 10,
  obj: TeamType = {},
): Promise<Team[]> => {
  const teams: Team[] = [];
  for (let i = 0; i < count; i++) {
    teams.push(await buildTeamParams(obj));
  }
  return await TeamRepo().addMany(teams);
};

export const teamFactory = async (obj: TeamType = {}): Promise<Team> => {
  const params: Team = await buildTeamParams(obj);
  return await TeamRepo().add(params);
};
