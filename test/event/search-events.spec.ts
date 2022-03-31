import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { eventFactory } from '../../src/event/event.factory';
import { SEARCH_EVENTS } from '../endpoints/event.endpoints';
import { date } from 'faker';
describe('search events suite case', () => {
  it('should search events by exact title', async () => {
    const user = await userFactory();
    const event = await eventFactory({ attendees: [user._id] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_EVENTS}/${event.title}`,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(event._id.toString());
  });

  it('should search events by inexact title', async () => {
    const user = await userFactory();
    const event = await eventFactory({
      attendees: [user._id],
      date: date.future().toISOString(),
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: `${SEARCH_EVENTS}/${event.title.substring(0, 2)}`,
      token: user.token,
    });
    const ids = (res.body.docs as Array<any>).map((events) => {
      return events._id.toString();
    });
    expect(ids.includes(event._id.toString())).toBe(true);
  });
});
