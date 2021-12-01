import { LookupSchemasEnum } from './../app.const';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId, Types } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { Event, EventDocument } from './schema/event.schema';
import { CreateEventInput } from './inputs/create-event.input';
import { GetEventsInput } from './inputs/get-events.input';
import { ManageJoinEventInput } from './inputs/manage-join.input';
import { DeleteEventInput } from './inputs/delete-event.input';
import { Pagination } from '../shared/utils/pagination.input';
import { UpdateEventInput } from './inputs/update-event.input';

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
      {
        $addFields: {
          upcoming: {
            $cond: {
              if: {
                $gt: ['$date', new Date().toISOString()],
              },
              then: true,
              else: false,
            },
          },
        },
      },
    ]);
    return await this.eventSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  async manageJoinEvent(userId: ObjectId, input: ManageJoinEventInput) {
    await this.eventSchema.updateOne(
      { _id: new Types.ObjectId(input.eventId) },
      [
        {
          $set: {
            attendees: {
              $cond: [
                {
                  $in: [userId, '$attendees'],
                },
                {
                  $setDifference: ['$attendees', [userId]],
                },
                {
                  $concatArrays: ['$attendees', [userId]],
                },
              ],
            },
          },
        },
      ],
    );
    return await this.eventSchema.findOne({
      _id: new Types.ObjectId(input.eventId),
    });
  }

  async deleteEvent(userId: ObjectId, input: DeleteEventInput) {
    return await this.eventSchema.findOneAndDelete({
      _id: new Types.ObjectId(input.eventId),
      host: userId,
    });
  }

  async deleteEventById(input: DeleteEventInput) {
    return await this.eventSchema.findOneAndDelete({
      _id: new Types.ObjectId(input.eventId),
    });
  }

  async getAllEvents(input: Pagination) {
    const aggregation = this.eventSchema.aggregate([{ $match: {} }]);
    return await this.eventSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  async updateEvent(input: UpdateEventInput, logo: Express.Multer.File) {
    return await this.eventSchema.findOneAndUpdate(
      { _id: new Types.ObjectId(input.eventId) },
      {
        ...input,
        ...(logo && { logo: `${process.env.HOST}events/${logo.filename}` }),
      },
      { new: true },
    );
  }
}
