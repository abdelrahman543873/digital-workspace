import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { skillFactory, buildSkillParams } from '../../src/skill/skill.factory';
import { SKILL } from '../endpoints/skill.endpoints';
import { skillTestRepo } from './skill-test-repo';
describe('update skill case', () => {
  it('should update skill', async () => {
    const user = await userFactory();
    const skill = await skillFactory();
    const skillParams = buildSkillParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: SKILL,
      variables: {
        id: skill._id.toString(),
        name: skillParams.name,
      },
      token: user.token,
    });
    expect(res.body.name).toBe(skillParams.name);
  });

  it("should throw error when employment type id doesn't exists", async () => {
    const user = await userFactory();
    const skill = buildSkillParams();
    const skillSeeded = await skillFactory();
    await skillTestRepo().deleteOne({ _id: skillSeeded._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SKILL,
      variables: {
        id: skillSeeded._id.toString(),
        name: skill.name,
        description: skill.description,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
