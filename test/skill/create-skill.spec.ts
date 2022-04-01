import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { SKILL } from '../endpoints/skill.endpoints';
import { buildSkillParams, skillFactory } from '../../src/skill/skill.factory';
describe('create skill case', () => {
  it('should create skill', async () => {
    const user = await userFactory();
    const skill = buildSkillParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SKILL,
      variables: skill,
      token: user.token,
    });
    expect(res.body.name).toBe(skill.name);
  });

  it('should throw error when employment type name already exists', async () => {
    const user = await userFactory();
    const skillType = await skillFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: SKILL,
      variables: {
        name: skillType.name,
        description: skillType.description,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
