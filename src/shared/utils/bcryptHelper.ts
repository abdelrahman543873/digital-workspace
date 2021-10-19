import { compare, genSalt, genSaltSync, hash, hashSync } from 'bcryptjs';

export const hashPass = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const bcryptCheckPass = async (
  userPassword: string,
  hashedPass: string,
): Promise<boolean> => {
  return await compare(userPassword, hashedPass);
};

export const hashPassSync = (password: string): string => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};
