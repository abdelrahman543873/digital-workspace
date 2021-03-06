import { EmploymentTypeRepository } from './../src/employment-type/employment-type.repository';
import { TestingModule } from '@nestjs/testing';
import { PostRepository } from '../src/post/post.repository';
import { PageRepository } from '../src/page/page.repository';
import { UserRepository } from '../src/user/user.repository';
import { EventRepository } from '../src/event/event.repository';
import { GroupRepository } from '../src/group/group.repository';
import { CommentRepository } from '../src/comment/comment.repository';
import { TaskRepository } from '../src/task/task.repository';
import { TeamRepository } from '../src/team/team.repository';
import NodeEnvironment from 'jest-environment-node';
import { CountryRepository } from '../src/country/country.repository';
import { LevelRepository } from '../src/level/level.repository';
import { DepartmentRepository } from '../src/department/department.repository';
import { SkillRepository } from '../src/skill/skill.repository';
import { TitleRepository } from '../src/title/title.repository';
import { InterestRepository } from '../src/interest/interest.repository';
import { LeaveRepository } from '../src/leave/repositories/leave.repository';
import { LeaveTypeRepository } from '../src/leave/repositories/leave-type.repository';
import { RoleRepository } from '../src/role/role.repository';
import { RejectionReasonRepository } from '../src/leave/repositories/rejection-reason.repository';
import { LeaveCriteriaRepository } from '../src/leave/repositories/leave-criteria.repository';
import { LeaveUserRepository } from '../src/leave/repositories/leave-user.repository';

class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    this.global.__MONGO_URI__ = global.mongoUri;
    this.global.__MONGO_DB_NAME__ = global.mongoDBName;
    this.global.app = global.app;
    const app: TestingModule = <TestingModule>this.global.app;
    this.global.userRepository = app.get<UserRepository>(UserRepository);
    this.global.pageRepository = app.get<PageRepository>(PageRepository);
    this.global.postRepository = app.get<PostRepository>(PostRepository);
    this.global.eventRepository = app.get<EventRepository>(EventRepository);
    this.global.groupRepository = app.get<GroupRepository>(GroupRepository);
    this.global.commentRepository =
      app.get<CommentRepository>(CommentRepository);
    this.global.taskRepository = app.get<TaskRepository>(TaskRepository);
    this.global.teamRepository = app.get<TeamRepository>(TeamRepository);
    this.global.countryRepository =
      app.get<CountryRepository>(CountryRepository);
    this.global.levelRepository = app.get<LevelRepository>(LevelRepository);
    this.global.departmentRepository =
      app.get<DepartmentRepository>(DepartmentRepository);
    this.global.employmentTypeRepository = app.get<EmploymentTypeRepository>(
      EmploymentTypeRepository,
    );
    this.global.skillRepository = app.get<SkillRepository>(SkillRepository);
    this.global.titleRepository = app.get<TitleRepository>(TitleRepository);
    this.global.interestRepository =
      app.get<InterestRepository>(InterestRepository);
    this.global.leaveRepository = app.get<LeaveRepository>(LeaveRepository);
    this.global.leaveTypeRepository =
      app.get<LeaveTypeRepository>(LeaveTypeRepository);
    this.global.roleRepository = app.get<RoleRepository>(RoleRepository);
    this.global.rejectionReasonRepository = app.get<RejectionReasonRepository>(
      RejectionReasonRepository,
    );
    this.global.leaveCriteriaRepository = app.get<LeaveCriteriaRepository>(
      LeaveCriteriaRepository,
    );
    this.global.leaveUserRepository =
      app.get<LeaveUserRepository>(LeaveUserRepository);
  }

  async teardown() {
    await super.teardown();
  }
}
module.exports = MongoEnvironment;
