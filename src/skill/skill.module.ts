import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from './schema/skill.schema';
import { SkillController } from './skill.controller';
import { SkillRepository } from './skill.repository';
import { SkillService } from './skill.service';
import { UniqueSkillName } from './validators/unique-skill-name.validator';
import { ExistingSkillId } from './validators/existing-skill-id.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
  ],
  controllers: [SkillController],
  providers: [SkillService, SkillRepository, UniqueSkillName, ExistingSkillId],
})
export class SkillModule {}
