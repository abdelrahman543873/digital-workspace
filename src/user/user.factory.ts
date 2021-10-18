import { generateAuthToken } from './../shared/utils/token-utils';
import * as faker from 'faker';
import { User } from './schema/user.schema';
import { UserRepo } from '../../test/user/user-test-repo';

interface UserType {
  email?: string;
  password?: string;
}

export const buildUserParams = (obj: UserType = {}): User => {
  return {
    email: obj.email || faker.internet.email(),
    password: obj.password || faker.internet.password(),
  };
};

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
  const user = await (await UserRepo()).add(params);
  user.token = generateAuthToken(user._id);
  return user;
};
