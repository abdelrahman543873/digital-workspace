import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
import { buildEventParams } from '../../src/event/event.factory';
import { CREATE_EVENT } from '../endpoints/event.endpoints';
describe('create event suite case', () => {
  it('should create event', async () => {
    const user = await userFactory();
    const { attendees, logo, host, ...event } = await buildEventParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: CREATE_EVENT,
      variables: event,
      token: user.token,
      filePath,
      fileParam: 'logo',
    });
    expect(res.body.title).toBe(event.title);
    expect(res.body.logo).toContain('events');
  });
});
