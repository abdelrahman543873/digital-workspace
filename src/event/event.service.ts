import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { EventRepository } from './event.repository';
import { CreateEventInput } from './inputs/create-event.input';

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
}
