import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { eventFactory } from '../../src/event/event.factory';
import { JOIN_EVENT } from '../endpoints/event.endpoints';
describe('manage join event suite case', () => {
  it('should join event', async () => {
    const user = await userFactory();
    const event = await eventFactory({});
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: JOIN_EVENT,
      token: user.token,
      variables: { eventId: event._id },
    });
    expect(res.body.attendees[1].toString()).toBe(user._id.toString());
  });
});
