import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { EventRepository } from './event.repository';
import { CreateEventInput } from './inputs/create-event.input';
import { GetEventsInput } from './inputs/get-events.input';
import { ManageJoinEventInput } from './inputs/manage-join.input';
import { DeleteEventInput } from './inputs/delete-event.input';
import { Pagination } from '../shared/utils/pagination.input';
import { UpdateEventInput } from './inputs/update-event.input';
import { SearchEventInput } from './inputs/search-events.input';

@Injectable()
export class EventService {
  constructor(
    private eventRepository: EventRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}
  async createEvent(input: CreateEventInput, logo: Express.Multer.File) {
    return await this.eventRepository.createEvent(
      this.request.currentUser._id,
      input,
      logo,
    );
  }

  async getEvents(input: GetEventsInput) {
    return await this.eventRepository.getEvents(
      this.request.currentUser._id,
      input,
    );
  }

  async getAllEvents(input: Pagination) {
    return await this.eventRepository.getAllEvents(input);
  }

  async manageJoinEvent(input: ManageJoinEventInput) {
    return await this.eventRepository.manageJoinEvent(
      this.request.currentUser._id,
      input,
    );
  }

  async deleteEvent(input: DeleteEventInput) {
    return await this.eventRepository.deleteEvent(
      this.request.currentUser._id,
      input,
    );
  }

  async deleteEventById(input: DeleteEventInput) {
    return await this.eventRepository.deleteEventById(input);
  }

  async updateEvent(input: UpdateEventInput, logo: Express.Multer.File) {
    return await this.eventRepository.updateEvent(input, logo);
  }

  async searchEvents(input: SearchEventInput) {
    return await this.eventRepository.searchEvents(input);
  }
}
