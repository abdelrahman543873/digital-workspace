import { UserModule } from './../../user/user.module';
import { Module } from '@nestjs/common';
import { SeedUsersServices } from './seed-users.service';

@Module({
  imports: [UserModule],
  providers: [SeedUsersServices],
})
export class ServicesModule {}
