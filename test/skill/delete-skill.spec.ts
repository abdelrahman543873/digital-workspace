import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { skillFactory } from '../../src/skill/skill.factory';
import { SKILL } from '../endpoints/skill.endpoints';
import { skillTestRepo } from './skill-test-repo';
describe('delete employment type case', () => {
  it('should delete employment type', async () => {
    const user = await userFactory();
    const skill = await skillFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: SKILL,
      variables: {
        id: skill._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.name).toBe(skill.name);
  });

  it("should throw error when skill id doesn't exists", async () => {
    const user = await userFactory();
    const skillSeeded = await skillFactory();
    await skillTestRepo().deleteOne({ _id: skillSeeded._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SKILL,
      variables: {
        id: skillSeeded._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
