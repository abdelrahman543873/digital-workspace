import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamsRepository } from './teams.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [HttpModule.register({}), UserModule],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository],
})
export class TeamsModule {}
