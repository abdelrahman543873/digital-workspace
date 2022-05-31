import { userFactory } from '../../src/user/user.factory';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { buildLeaveParams } from './factories/leave.factory';
import { LEAVE } from '../endpoints/leave.endpoints';
import { leaveCriteriaFactory } from './factories/leave-criteria.factory';
describe('create leave case', () => {
  it('should create leave', async () => {
    const leave = await buildLeaveParams();
    const user = await userFactory();
    // creating the criteria that fits the user
    await leaveCriteriaFactory({
      leaveType: leave.type,
      countries: [user.country],
      departments: [],
      employmentTypes: [],
      gender: user.gender,
    });
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LEAVE,
      variables: {
        startDate: leave.startDate.toISOString(),
        endDate: leave.endDate.toISOString(),
        type: leave.type.toString(),
        comment: leave.comment,
      },
      token: user.token,
      filePath,
      fileParam: 'attachments',
    });
    expect(res.body.type).toBe(decodeURI(encodeURI(leave.type.toString())));
    expect(res.body.attachments.length).toBeGreaterThanOrEqual(1);
  });

  it("shouldn't create leave if leave type if it doesn't exist", async () => {
    const leave = await buildLeaveParams();
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LEAVE,
      variables: {
        startDate: leave.startDate.toISOString(),
        endDate: leave.endDate.toISOString(),
        type: user._id.toString(),
        comment: leave.comment,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(1);
  });

  it("shouldn't create leave if start date is bigger than endDate", async () => {
    const leave = await buildLeaveParams();
    const user = await userFactory();
    await leaveCriteriaFactory({
      leaveType: leave.type,
      countries: [user.country],
      departments: [],
      employmentTypes: [],
      gender: user.gender,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LEAVE,
      variables: {
        startDate: leave.endDate.toISOString(),
        endDate: leave.startDate.toISOString(),
        type: leave.type.toString(),
        comment: leave.comment,
      },
      token: user.token,
    });
    console.log(res.body);
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(2);
  });

  it("shouldn't create leave if user doesn't fit the leave criteria", async () => {
    const leave = await buildLeaveParams();
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LEAVE,
      variables: {
        startDate: leave.startDate.toISOString(),
        endDate: leave.endDate.toISOString(),
        type: leave.type.toString(),
        comment: leave.comment,
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(1);
  });

  it("shouldn't create leave if user balance doesn't fit", async () => {
    const endDate = new Date();
    const earlier50DaysDate = new Date();
    earlier50DaysDate.setDate(endDate.getDate() - 50);
    const user = await userFactory();
    const leaveCriteria = await leaveCriteriaFactory({
      countries: [],
      departments: [],
      employmentTypes: [],
      gender: user.gender,
      maximumDays: 40,
    });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: LEAVE,
      variables: {
        startDate: earlier50DaysDate,
        endDate: endDate,
        type: leaveCriteria.leaveType.toString(),
      },
      token: user.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(2);
    expect(res.body.message[0]).toContain('balance');
  });
});
