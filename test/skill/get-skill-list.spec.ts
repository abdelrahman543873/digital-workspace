import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { skillFactory } from '../../src/skill/skill.factory';
import { SKILLS_LIST } from '../endpoints/skill.endpoints';
describe('get skills list case', () => {
  it('should get skills list', async () => {
    const skill = await skillFactory();
    const user = await userFactory({ skills: [skill._id] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: SKILLS_LIST,
      token: user.token,
    });
    expect(res.body.docs[0].members).toBe(1);
  });
});
