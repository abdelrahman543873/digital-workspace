import { EventRepository } from '../../src/event/event.repository';

export const EventRepo = (): EventRepository => global.eventRepository;
