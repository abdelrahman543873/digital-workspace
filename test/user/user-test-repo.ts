import { UserRepository } from '../../src/user/user.repository';
export const UserRepo = (): UserRepository => global.userRepository;
