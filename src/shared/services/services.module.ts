import { UserModule } from './../../user/user.module';
import { Logger, Module } from '@nestjs/common';
import { SeedUsersServices } from './seed-users.service';

@Module({
  imports: [UserModule],
  providers: [SeedUsersServices, Logger],
})
export class ServicesModule {}
