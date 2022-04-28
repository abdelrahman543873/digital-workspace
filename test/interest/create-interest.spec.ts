import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import {
  buildInterestParams,
  interestFactory,
} from '../../src/interest/interest.factory';
import { INTEREST } from '../endpoints/interest.endpoints';
describe('create interest case', () => {
  it('should create interest', async () => {
    const user = await userFactory();
    const interest = buildInterestParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: INTEREST,
      variables: interest,
      token: user.token,
    });
    expect(res.body.name).toBe(interest.name);
  });

  it('should throw error when interest name already exists', async () => {
    const user = await userFactory();
    const interestType = await interestFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: INTEREST,
      variables: {
        name: interestType.name,
        description: interestType.description,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
  });
});
