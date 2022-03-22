import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamRepository } from './team.repository';
import { TeamService } from './team.service';
import { Team, TeamSchema } from './schema/team.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UniqueNameValidator } from './validators/unique-name.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
  ],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository, UniqueNameValidator],
})
export class TeamModule {}
