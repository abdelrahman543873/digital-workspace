import { HTTP_METHODS_ENUM } from './../request.methods.enum';
import { testRequest } from './../request';
import { userFactory } from '../../src/user/user.factory';
import { LEAVE_BALANCE } from '../endpoints/leave.endpoints';
import { leaveCriteriaFactory } from './factories/leave-criteria.factory';
import { leaveUserFactory } from './factories/leave-user.factory';
import { datatype } from 'faker';
describe('should get leave balance', () => {
  it('should get leave balance when all criterions are matching and get the balance with the correct subtracted result', async () => {
    const leaveCriteria = await leaveCriteriaFactory({ departments: [] });
    // additional leave criteria for checking
    await leaveCriteriaFactory();
    const user = await userFactory({
      country: leaveCriteria.countries[0],
      gender: leaveCriteria.gender,
      employmentType: leaveCriteria.employmentTypes[0],
    });
    const userLeaveRequest = await leaveUserFactory({
      user: user._id,
      leaveType: leaveCriteria.leaveType,
      numberOfDays: datatype.number(leaveCriteria.maximumDays),
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.GET,
      url: LEAVE_BALANCE,
      token: user.token,
    });
    expect(res.body[0].remainingBalance).toBe(
      leaveCriteria.maximumDays - userLeaveRequest.numberOfDays,
    );
    expect(res.body[0].remainingBalance).toBeGreaterThanOrEqual(0);
    expect(res.body.length).toBe(1);
    expect(res.body[0].startingMonth).toBe(leaveCriteria.startingMonth);
    expect(res.body[0].leaveType).toHaveProperty('_id');
  });
});
