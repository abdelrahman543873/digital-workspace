import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { MANAGE_LEAVE } from '../endpoints/leave.endpoints';
import { userFactory } from '../../src/user/user.factory';
import { leaveFactory } from './factories/leave.factory';
import { testRequest } from '../request';
import { LEAVE_STATUS } from '../../src/leave/leave.enum';
import { departmentFactory } from '../department/department.factory';
import { DepartmentTestRepo } from '../department/department-test-repo';
import { leaveUserTestRepo } from './test-repos/leave-user-test-repo';
describe('manage leave case', () => {
  afterEach(async () => {
    await DepartmentTestRepo().rawDelete();
  });
  it('should manage leave as a direct manager', async () => {
    const manager = await userFactory();
    const employee = await userFactory({ directManagerId: manager._id });
    const leave = await leaveFactory({ employee: employee._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.MANAGER_APPROVED,
      },
      token: manager.token,
    });
    expect(res.body.status).toBe(LEAVE_STATUS.MANAGER_APPROVED);
  });

  it("should throw error if there is a justification reason and the status isn't rejected", async () => {
    const manager = await userFactory();
    const employee = await userFactory({ directManagerId: manager._id });
    const leave = await leaveFactory({ employee: employee._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.MANAGER_APPROVED,
        rejectionJustification: leave.rejectionJustification,
      },
      token: manager.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(1);
  });

  it('should throw error if there is a rejection without justification reason', async () => {
    const manager = await userFactory();
    const employee = await userFactory({ directManagerId: manager._id });
    const leave = await leaveFactory({ employee: employee._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.REJECTED,
      },
      token: manager.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(1);
  });

  it('should reject leave', async () => {
    const manager = await userFactory();
    const employee = await userFactory({ directManagerId: manager._id });
    const leave = await leaveFactory({ employee: employee._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.REJECTED,
        rejectionJustification: leave.rejectionJustification,
        rejectionReason: leave.rejectionReason.toString(),
      },
      token: manager.token,
    });
    expect(res.body.rejectionJustification).toBe(leave.rejectionJustification);
  });

  it('should throw error when additional info with no comment', async () => {
    const manager = await userFactory();
    const employee = await userFactory({ directManagerId: manager._id });
    const leave = await leaveFactory({ employee: employee._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.ADDITIONAL_INFO,
      },
      token: manager.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(1);
  });

  it('should update to additional info', async () => {
    const manager = await userFactory();
    const employee = await userFactory({ directManagerId: manager._id });
    const leave = await leaveFactory({ employee: employee._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.ADDITIONAL_INFO,
        comment: leave.comment,
      },
      token: manager.token,
    });
    expect(res.body.comment).toBe(leave.comment);
  });

  it("should throw error when rejection reason isn't added", async () => {
    const manager = await userFactory();
    const employee = await userFactory({ directManagerId: manager._id });
    const leave = await leaveFactory({ employee: employee._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.REJECTED,
        rejectionJustification: leave.rejectionJustification,
      },
      token: manager.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(1);
  });

  it('should manage leave as an HR employee', async () => {
    const department = await departmentFactory({ name: 'Human Resources' });
    const HR = await userFactory({ department: department._id });
    const employee = await userFactory({ directManagerId: HR._id });
    const leave = await leaveFactory({ employee: employee._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.APPROVED,
      },
      token: HR.token,
    });
    expect(
      await leaveUserTestRepo().findOne({
        user: employee._id,
        leaveType: leave.type,
      }),
    ).toBeTruthy();
    expect(res.body.status).toBe(LEAVE_STATUS.APPROVED);
  });

  it("should throw error when management isn't from manager and not the hr department", async () => {
    const manager = await userFactory();
    const employee = await userFactory();
    const leave = await leaveFactory({ employee: employee._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.PENDING,
      },
      token: manager.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(1);
  });

  it('should throw error when approval is from direct manager', async () => {
    const manager = await userFactory();
    const employee = await userFactory({ directManagerId: manager._id });
    const leave = await leaveFactory({ employee: employee._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.APPROVED,
      },
      token: manager.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(1);
  });

  it('should throw error when manager approval is from HR', async () => {
    const department = await departmentFactory({ name: 'Human Resources' });
    const HR = await userFactory({ department: department._id });
    const leave = await leaveFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: leave._id.toString(),
        status: LEAVE_STATUS.MANAGER_APPROVED,
      },
      token: HR.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(1);
  });

  it("should throw error when leave doesn't exist", async () => {
    const manager = await userFactory();
    const employee = await userFactory({ directManagerId: manager._id });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: MANAGE_LEAVE,
      variables: {
        id: employee._id.toString(),
        status: LEAVE_STATUS.MANAGER_APPROVED,
      },
      token: manager.token,
    });
    expect(res.body.statusCode).toBe(400);
    expect(res.body.message.length).toBe(1);
  });
});
