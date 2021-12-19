import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { buildEventParams, eventFactory } from '../../src/event/event.factory';
import { UPDATE_EVENT } from '../endpoints/event.endpoints';
describe('update event suite case', () => {
  it('should update event', async () => {
    const user = await userFactory();
    const seededEvent = await eventFactory();
    const { attendees, logo, host, ...event } = await buildEventParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: UPDATE_EVENT,
      variables: { ...event, eventId: seededEvent._id.toString() },
      token: user.token,
      filePath,
      fileParam: 'logo',
    });
    expect(res.body.title).toBe(event.title);
    expect(res.body.logo).toContain(process.env.HOST);
  });
});
