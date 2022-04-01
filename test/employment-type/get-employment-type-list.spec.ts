import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { EMPLOYMENT_TYPE_LIST } from '../endpoints/employment-type.endpoint';
import { EmploymentTypeFactory } from '../../src/employment-type/employment-type.factory';
describe('get employment type list case', () => {
  it('should get employment type list', async () => {
    const employmentType = await EmploymentTypeFactory();
    const user = await userFactory({ employmentType: employmentType._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: EMPLOYMENT_TYPE_LIST,
      token: user.token,
    });
    expect(res.body.docs[0].members).toBe(1);
  });
});
