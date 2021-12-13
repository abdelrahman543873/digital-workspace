import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { LogUserInput } from './log-user.input';
import qs from 'qs';

@Injectable()
export class TeamsRepository {
  constructor(private httpService: HttpService) {}
  async logUser(input: LogUserInput) {
    let token = '';
    await firstValueFrom(
      this.httpService.post(
        `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
        qs.stringify({
          client_id: process.env.CLIENT_ID,
          scope: 'user.read',
          code: input.code,
          redirect_uri: 'https://digital-workspace.azurewebsites.net/home',
          grant_type: 'authorization_code',
          client_secret: process.env.CLIENT_SECRET,
        }),
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        },
      ),
    )
      .then((response) => {
        token = response.data.access_token;
      })
      .catch((e) => {
        console.log(e);
        throw new HttpException(e.message, 400);
      });
    const response = await firstValueFrom(
      this.httpService.get(
        'https://graph.microsoft.com/v1.0/me/calendar/events',
        { headers: { Authorization: `Bearer ${token}` } },
      ),
    );
    return response.data.value;
  }
}
