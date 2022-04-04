import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InterestRepository } from './interest.repository';
import { Interest, InterestSchema } from './schema/interest.schema';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { UniqueInterestName } from './validators/unique-interest-name.validator';
import { ExistingInterestId } from './validators/existing-interest-id.validator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interest.name, schema: InterestSchema },
    ]),
  ],
  controllers: [InterestController, InterestController],
  providers: [
    InterestService,
    InterestRepository,
    UniqueInterestName,
    ExistingInterestId,
    InterestService,
  ],
})
export class InterestModule {}
