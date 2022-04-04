import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { interestFactory } from '../../src/interest/interest.factory';
import { INTEREST } from '../endpoints/interest.endpoints';
import { interestTestRepo } from './interest-test-repo';
describe('delete interest case', () => {
  it('should delete interest', async () => {
    const user = await userFactory();
    const interest = await interestFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.DELETE,
      url: INTEREST,
      variables: {
        id: interest._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.name).toBe(interest.name);
  });

  it("should throw error when interest id doesn't exists", async () => {
    const user = await userFactory();
    const interestSeeded = await interestFactory();
    await interestTestRepo().deleteOne({ _id: interestSeeded._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: INTEREST,
      variables: {
        id: interestSeeded._id.toString(),
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
