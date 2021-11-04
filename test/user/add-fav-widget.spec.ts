import { testRequest } from '../request';
import { HTTP_METHODS_ENUM } from '../request.methods.enum';
import { ADD_FAV_WIDGET } from '../endpoints/user.endpoints';
import { userFactory } from '../../src/user/user.factory';
import { WIDGETS } from '../../src/app.const';
describe('add fav widget suite case', () => {
  it('should add fav widget', async () => {
    const user = await userFactory({ widgets: [] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: ADD_FAV_WIDGET,
      variables: {
        widgets: [WIDGETS[0]],
      },
      token: user.token,
    });
    expect(res.body.widgets[0]).toBe(WIDGETS[0]);
  });

  it('should add empty widget', async () => {
    const user = await userFactory({ widgets: [WIDGETS[0]] });
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.PUT,
      url: ADD_FAV_WIDGET,
      variables: {
        widgets: [],
      },
      token: user.token,
    });
    expect(res.body.widgets.length).toBe(0);
  });
});
