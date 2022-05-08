import { buildUserParams } from './../../src/user/user.seed';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { ADD_USER } from '../endpoints/user.endpoints';
import { skillFactory } from '../../src/skill/skill.factory';
import { GENDER } from '../../src/app.const';
import { countryFactory } from '../../src/country/country.factory';
import { userFactory } from '../../src/user/user.factory';
import { levelFactory } from '../../src/level/level.factory';
import { EmploymentTypeFactory } from '../../src/employment-type/employment-type.factory';
describe('register user suite case', () => {
  it('should register user and return a token', async () => {
    const params = await buildUserParams();
    const skill = await skillFactory();
    const country = await countryFactory();
    const user = await userFactory();
    const level = await levelFactory();
    const employmentType = await EmploymentTypeFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_USER,
      variables: {
        email: params.email,
        password: params.password,
        status: params.status,
        governmentalId: params.governmentalId,
        phone: params.phone,
        skills: [skill._id.toString()],
        gender: GENDER[0],
        country: country._id.toString(),
        directManagerId: user._id.toString(),
        level: level._id.toString(),
        employmentType: employmentType._id.toString(),
        education: params.education,
      },
    });
    expect(res.body.education[0].level).toBe(params.education[0].level);
    expect(res.body.skills[0]).toBe(skill._id.toString());
    expect(res.body.token).toBeTruthy();
    expect(res.body.email).toBe(params.email.toLowerCase());
  });

  it('should register user that is company and not admin', async () => {
    const params = await buildUserParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_USER,
      variables: {
        email: params.email,
        password: params.password,
        isAdmin: 'false',
        isCompany: 'true',
        status: params.status,
        governmentalId: params.governmentalId,
        phone: params.phone,
        gender: GENDER[0],
      },
    });
    expect(res.body.isCompany).toBe(true);
    expect(res.body.isAdmin).toBe(false);
    expect(res.body.token).toBeTruthy();
    expect(res.body.email).toBe(params.email.toLowerCase());
  });

  it('should add user with cover pic', async () => {
    const params = await buildUserParams();
    const testFiles = process.cwd();
    const filePath = `${testFiles}/test/test-files/test-duck.jpeg`;
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_USER,
      variables: {
        email: params.email,
        password: params.password,
        status: params.status,
        governmentalId: params.governmentalId,
        phone: params.phone,
        gender: GENDER[0],
      },
      filePath,
      fileParam: 'coverPic',
    });
    expect(res.body.coverPic).toContain(process.env.HOST);
    expect(res.body.token).toBeTruthy();
    expect(res.body.email).toBe(params.email.toLowerCase());
  });
});
