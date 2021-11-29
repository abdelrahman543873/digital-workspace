import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { eventFactory } from '../../src/event/event.factory';
import { ALL_EVENTS } from '../endpoints/event.endpoints';
describe('get all event suite case', () => {
  it('should get all events', async () => {
    const user = await userFactory();
    const event = await eventFactory({});
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: ALL_EVENTS,
      token: user.token,
    });
    expect(res.body.docs[0]._id.toString()).toBe(event._id.toString());
  });
});
