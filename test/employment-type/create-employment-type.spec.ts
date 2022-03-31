import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { EMPLOYMENT_TYPE } from '../endpoints/employment-type.endpoint';
import {
  buildEmploymentTypeParams,
  EmploymentTypeFactory,
} from '../../src/employment-type/employment-type.factory';
describe('create employment type case', () => {
  it('should create employment type', async () => {
    const user = await userFactory();
    const employmentType = buildEmploymentTypeParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: EMPLOYMENT_TYPE,
      variables: employmentType,
      token: user.token,
    });
    expect(res.body.name).toBe(employmentType.name);
  });

  it('should throw error when employment type name already exists', async () => {
    const user = await userFactory();
    const employmentType = await EmploymentTypeFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: EMPLOYMENT_TYPE,
      variables: {
        name: employmentType.name,
        description: employmentType.description,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
