import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LevelController } from './level.controller';
import { LevelRepository } from './level.repository';
import { LevelService } from './level.service';
import { Level, LevelSchema } from './schema/level.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Level.name, schema: LevelSchema }]),
  ],
  controllers: [LevelController],
  providers: [LevelService, LevelRepository],
})
export class LevelModule {}
