import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { titleFactory } from '../../src/title/title.factory';
import { TITLE } from '../endpoints/title.endpoints';
import { titleTestRepo } from './title-test-repo';
describe('delete title type case', () => {
  it('should delete title', async () => {
    const user = await userFactory();
    const title = await titleFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: TITLE,
      variables: {
        id: title._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.name).toBe(title.name);
  });

  it("should throw error when skill id doesn't exists", async () => {
    const user = await userFactory();
    const titleSeeded = await titleFactory();
    await titleTestRepo().deleteOne({ _id: titleSeeded._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: TITLE,
      variables: {
        id: titleSeeded._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
