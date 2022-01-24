import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';

@Injectable()
export class SeedUsersServices implements OnApplicationBootstrap {
  constructor(private userRepo: UserRepository, private logger: Logger) {}
  async onApplicationBootstrap() {
    return await this.userRepo.loadUser().catch((error) => {
      this.logger.warn(error.message);
    });
  }
}
