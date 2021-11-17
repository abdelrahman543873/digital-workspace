import { moduleRef } from '../before-test-run';
import { EventRepository } from '../../src/event/event.repository';

export const EventRepo = async (): Promise<EventRepository> =>
  (await moduleRef()).get<EventRepository>(EventRepository);
