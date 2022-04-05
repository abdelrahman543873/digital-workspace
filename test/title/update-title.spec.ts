import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { titleFactory, buildTitleParams } from '../../src/title/title.factory';
import { TITLE } from '../endpoints/title.endpoints';
import { titleTestRepo } from './title-test-repo';
describe('update title case', () => {
  it('should update title', async () => {
    const user = await userFactory();
    const title = await titleFactory();
    const titleParams = await buildTitleParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: TITLE,
      variables: {
        id: title._id.toString(),
        name: titleParams.name,
        department: title.department.toString(),
      },
      token: user.token,
    });
    expect(Object.keys(res.body.department).length).toBeGreaterThan(0);
    expect(res.body.name).toBe(titleParams.name);
  });

  it("should throw error when employment type id doesn't exists", async () => {
    const user = await userFactory();
    const skill = await buildTitleParams();
    const titleSeeded = await titleFactory();
    await titleTestRepo().deleteOne({ _id: titleSeeded._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: TITLE,
      variables: {
        id: titleSeeded._id.toString(),
        name: skill.name,
        description: skill.description,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
