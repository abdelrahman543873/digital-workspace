import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';

@Injectable()
export class SeedUsersServices implements OnApplicationBootstrap {
  constructor(private userRepo: UserRepository) {}
  async onApplicationBootstrap() {
    await this.userRepo.loadUser();
  }
}
