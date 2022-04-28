import { userFactory } from './../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { EMPLOYMENT_TYPE } from '../endpoints/employment-type.endpoint';
import {
  buildEmploymentTypeParams,
  EmploymentTypeFactory,
} from '../../src/employment-type/employment-type.factory';
import { EmploymentTypeTestRepo } from './employment-type-test-repo';
describe('delete employment type case', () => {
  it('should delete employment type', async () => {
    const user = await userFactory();
    const employmentType = await EmploymentTypeFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: EMPLOYMENT_TYPE,
      variables: {
        id: employmentType._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.name).toBe(employmentType.name);
  });

  it("should throw error when employment type id doesn't exists", async () => {
    const user = await userFactory();
    const employmentTypeSeeded = await EmploymentTypeFactory();
    await EmploymentTypeTestRepo().deleteOne({ _id: employmentTypeSeeded._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: EMPLOYMENT_TYPE,
      variables: {
        id: employmentTypeSeeded._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
