import qs from 'qs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RegisterUserTokenInput } from './inputs/register-user-token.input';
import { UserRepository } from '../user/user.repository';
import { ObjectId } from 'mongoose';
import { User } from '../user/schema/user.schema';
import { TeamsResponse } from '../shared/interfaces/teams-response.interface';

@Injectable()
export class TeamsRepository {
  constructor(
    private httpService: HttpService,
    private userRepository: UserRepository,
  ) {}

  async events(user: User) {
    const today = new Date();
    const response = await firstValueFrom(
      this.httpService.get(
        `https://graph.microsoft.com/v1.0/me/calendarView?startDateTime=${today.toISOString()}&endDateTime=${new Date(
          today.setDate(today.getDate() + 1),
        ).toISOString()}&$select=subject,organizer,onlineMeeting,attendees,start,end`,
        {
          headers: { Authorization: `Bearer ${user.microsoftToken}` },
        },
      ),
    );
    const teamsResponse: TeamsResponse = response.data;
    for await (const value of teamsResponse.value) {
      const valueWithAttendeesArray = [];
      for await (const attendee of value.attendees) {
        const dbAttendee = await this.userRepository.findOne(
          { email: attendee.emailAddress.address.toLowerCase() },
          { profilePic: 1, fullName: 1, email: 1 },
        );
        dbAttendee
          ? valueWithAttendeesArray.unshift(dbAttendee)
          : valueWithAttendeesArray.push(attendee);
      }
      value.attendees = valueWithAttendeesArray;
    }
    return teamsResponse.value;
  }

  async registerUserMicrosoft(userId: ObjectId, input: RegisterUserTokenInput) {
    const response = await firstValueFrom(
      this.httpService.post(
        `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
        qs.stringify({
          client_id: process.env.CLIENT_ID,
          scope: 'user.read',
          code: input.code,
          redirect_uri: process.env.REDIRECT_URI,
          grant_type: 'authorization_code',
          client_secret: process.env.CLIENT_SECRET,
        }),
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        },
      ),
    );
    return await this.userRepository.updateOne(
      { _id: userId },
      { microsoftToken: response.data.access_token },
    );
  }
}
