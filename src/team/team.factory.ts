import { TeamRepo } from './../../test/team/team-test-repo';
import { ObjectId } from 'mongoose';
import { name, datatype, internet } from 'faker';
import { Team } from './schema/team.schema';
import { UserRepo } from '../../test/user/user-test-repo';
import { STATUS } from '../user/user.enum';

interface TeamType {
  admin?: ObjectId;
  name?: string;
  members?: ObjectId[];
  description?: string;
}

export const buildTeamParams = async (obj: TeamType = {}): Promise<Team> => {
  // done this way to avoid infinite loop of calling userFactory
  const userId = (
    await UserRepo().add({
      email: internet.email(),
      password: internet.password(),
      status: STATUS.ACTIVE,
      fullName: internet.userName(),
    })
  )._id;
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
