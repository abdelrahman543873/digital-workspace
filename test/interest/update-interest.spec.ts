import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import {
  interestFactory,
  buildInterestParams,
} from '../../src/interest/interest.factory';
import { INTEREST } from '../endpoints/interest.endpoints';
import { interestTestRepo } from '../interest/interest-test-repo';
describe('update interest case', () => {
  it('should update interest', async () => {
    const user = await userFactory();
    const interest = await interestFactory();
    const interestParams = buildInterestParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: INTEREST,
      variables: {
        id: interest._id.toString(),
        name: interestParams.name,
      },
      token: user.token,
    });
    expect(res.body.name).toBe(interestParams.name);
  });

  it("should throw error when interest id doesn't exists", async () => {
    const user = await userFactory();
    const interest = buildInterestParams();
    const interestSeeded = await interestFactory();
    await interestTestRepo().deleteOne({ _id: interestSeeded._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: INTEREST,
      variables: {
        id: interestSeeded._id.toString(),
        name: interest.name,
        description: interest.description,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
