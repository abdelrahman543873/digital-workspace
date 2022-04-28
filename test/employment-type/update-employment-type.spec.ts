import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { EMPLOYMENT_TYPE } from '../endpoints/employment-type.endpoint';
import { EmploymentTypeTestRepo } from './employment-type-test-repo';
import {
  buildEmploymentTypeParams,
  EmploymentTypeFactory,
} from '../../src/employment-type/employment-type.factory';
describe('update employment type case', () => {
  it('should update employment type', async () => {
    const user = await userFactory();
    const employmentType = await EmploymentTypeFactory();
    const employmentTypeParams = buildEmploymentTypeParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: EMPLOYMENT_TYPE,
      variables: {
        id: employmentType._id.toString(),
        name: employmentTypeParams.name,
      },
      token: user.token,
    });
    expect(res.body.name).toBe(employmentTypeParams.name);
  });

  it("should throw error when employment type id doesn't exists", async () => {
    const user = await userFactory();
    const employmentType = buildEmploymentTypeParams();
    const employmentTypeSeeded = await EmploymentTypeFactory();
    await EmploymentTypeTestRepo().deleteOne({ _id: employmentTypeSeeded._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: EMPLOYMENT_TYPE,
      variables: {
        id: employmentTypeSeeded._id.toString(),
        name: employmentType.name,
        description: employmentType.description,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
