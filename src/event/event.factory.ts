import { ObjectId } from 'mongoose';
import { userFactory } from '../user/user.factory';
import { name, commerce, date } from 'faker';
import { Event } from './schema/event.schema';
import { EventRepo } from '../../test/event/event-test-repo';

interface EventType {
  host?: ObjectId;
  title?: string;
  description?: string;
  logo?: string;
  date?: string;
  attendees?: ObjectId[];
}

export const buildEventParams = async (obj: EventType = {}): Promise<Event> => {
  const userId = (await userFactory())._id;
  return {
    host: obj.host || userId,
    title: obj.title || name.jobTitle(),
    description: obj.description || commerce.productDescription(),
    logo: obj.logo || `${process.env.HOST}defaults/avatar.jpg`,
    date: obj.date || date.future().toISOString(),
    attendees: obj.attendees || [userId],
  };
};

export const eventsFactory = async (
  count = 10,
  obj: EventType = {},
): Promise<Event[]> => {
  const pages: Event[] = [];
  for (let i = 0; i < count; i++) {
    pages.push(await buildEventParams(obj));
  }
  return await EventRepo().addMany(pages);
};

export const eventFactory = async (obj: EventType = {}): Promise<Event> => {
  const params: Event = await buildEventParams(obj);
  return await EventRepo().add(params);
};
