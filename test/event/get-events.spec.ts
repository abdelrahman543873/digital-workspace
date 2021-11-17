import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { eventFactory } from '../../src/event/event.factory';
import { EVENTS } from '../endpoints/event.endpoints';
describe('get events suite case', () => {
  it('should get events', async () => {
    const user = await userFactory();
    const event = await eventFactory({ attendees: [user._id] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: EVENTS,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(event._id.toString());
  });
});
