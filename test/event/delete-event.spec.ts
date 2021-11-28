import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { eventFactory } from '../../src/event/event.factory';
import { REMOVE_EVENT } from '../endpoints/event.endpoints';
describe('delete event suite case', () => {
  it('should delete event', async () => {
    const user = await userFactory();
    const event = await eventFactory({ host: user._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: REMOVE_EVENT,
      variables: { eventId: event._id.toString() },
      token: user.token,
    });
    expect(res.body.host.toString()).toBe(user._id.toString());
  });
});
