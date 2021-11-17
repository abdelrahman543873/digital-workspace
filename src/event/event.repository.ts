import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { Event, EventDocument } from './schema/event.schema';
import { CreateEventInput } from './inputs/create-event.input';

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
}
