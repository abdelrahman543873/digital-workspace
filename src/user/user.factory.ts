import { hashPass } from './../shared/utils/bcryptHelper';
import { generateAuthToken } from './../shared/utils/token-utils';
import { User } from './schema/user.schema';
import { UserRepo } from '../../test/user/user-test-repo';
import { buildUserParams, UserType } from './user.seed';

export const usersFactory = async (
  count = 10,
  obj: UserType = {},
): Promise<User[]> => {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    users.push(buildUserParams(obj));
  }
  return (await UserRepo()).addMany(users);
};

export const userFactory = async (obj: UserType = {}): Promise<User> => {
  const params: User = buildUserParams(obj);
  const user = await (
    await UserRepo()
  ).add({ ...params, password: await hashPass(params.password) });
  user.token = generateAuthToken(user._id);
  return user;
};
