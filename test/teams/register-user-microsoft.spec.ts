import { REGISTER_USER_TOKEN } from './../endpoints/teams.endpoints';
import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { userFactory } from '../../src/user/user.factory';
describe('register user suite case', () => {
  it('should register microsoft token', async () => {
    const user = await userFactory();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: REGISTER_USER_TOKEN,
      variables: {
        code: '0.AVgAIWTrC-h4PEiwFwJXJ-rK4M-Z7Z2E0AlEn37RrPiA9s9YAGU.AQABAAIAAAD--DLA3VO7QrddgJg7WevruGFI-3AsQy4TEZys55PiPCzDuKfVGi_YhiwqJhBTZWweJeU2lI3iT6rriNMGg9hK8DsWLbKCO7BH0QftMSm4Y9n8Oo-cbqlpaWoNmSCP_mzREaS0PvHxSFd982GBzimoO2Wn2532lg6E05tQJ7c_b42-0NcvCWmmzCs-MKVRvihTXeOn0xdnp6Qa5YK5SeDLu91-Z9bP7pFRKJv3cucvCxwZHNZao6xhtESIi3r_LmPTP3Hy9xHC3t643JBX626JVWBx8vb1KT-eDZvK93TRH9bvMMgTooU-Kd-z4Ysyzcgn1V-AVloeGDKQ539G8wsrPmuGBv1qPJzgd5POZNWHSQVY3i6cYOp1PY0LItDQVKFO2qphpDPeqyWODxcVTKJ98maqPke487XTOIDROdWYR8eW-PFircHPVDqbMOEr99FNaig6vfJktzX7l860Yst0wXiSc4irKiSKkVpss3vaay9JKGKzx8kF02639W5f2VmI9DmqKE4vgZ9a-PWDytXGlmrWhVpU0dXzYR6K22plWff5INlefBWQjrHVDzgfmb6HwIJmwcdhmTKBhtEuOFtAkb_eWUB92WB_n7HmF-eJ4XR6s0qpZ2BFRvlYlmLbXpln9-RB7yQWBAz6XdOwv-By0NzOZTv12POxzbSTTwNS1QB4qoXL25Zq0c34vyZ8atQBAKXz9HRo6vxSGvzbyeUkU12ol7EplOFEeBG6Eh3KNiAA',
      },
      token: user.token,
    });
    console.log(res.body);
  });
});
