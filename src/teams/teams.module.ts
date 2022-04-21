import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamsRepository } from './teams.repository';
import { UserModule } from '../user/user.module';
import { Agent } from 'https';
import { ConfidentialApplication } from '../shared/providers/confidential-client-app';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new Agent({ rejectUnauthorized: false }),
    }),
    UserModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService, TeamsRepository, ConfidentialApplication],
})
export class TeamsModule {}
