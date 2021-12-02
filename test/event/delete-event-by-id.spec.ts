import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { eventFactory } from '../../src/event/event.factory';
import { REMOVE_EVENT_BY_ID } from '../endpoints/event.endpoints';
describe('delete event by id suite case', () => {
  it('should delete event by id', async () => {
    const user = await userFactory();
    const event = await eventFactory({});
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: REMOVE_EVENT_BY_ID,
      variables: { eventId: event._id.toString() },
      token: user.token,
    });
    expect(res.body._id.toString()).toBe(event._id.toString());
  });
});
