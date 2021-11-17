import { LookupSchemasEnum } from './../app.const';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId, Types } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { Event, EventDocument } from './schema/event.schema';
import { CreateEventInput } from './inputs/create-event.input';
import { GetEventsInput } from './inputs/get-events.input';

@Injectable()
export class EventRepository extends BaseRepository<Event> {
  constructor(
    @InjectModel(Event.name)
    private eventSchema: AggregatePaginateModel<EventDocument>,
  ) {
    super(eventSchema);
  }

  async createEvent(
    userId: ObjectId,
    input: CreateEventInput,
    logo: Express.Multer.File,
  ) {
    return await this.eventSchema.create({
      host: userId,
      ...input,
      ...(logo && { logo: `${process.env.HOST}events/${logo.filename}` }),
    });
  }

  async getEvents(userId: ObjectId, input: GetEventsInput) {
    const chosenId = input.userId ? new Types.ObjectId(input.userId) : userId;
    const aggregation = this.eventSchema.aggregate([
      {
        $match: {
          $expr: {
            $in: [chosenId, '$attendees'],
          },
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          let: { attendees: '$attendees' },
          as: 'attendees',
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$attendees'],
                },
              },
            },
            { $project: { profilePic: 1, fullName: 1 } },
          ],
        },
      },
    ]);
    return await this.eventSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }
}
