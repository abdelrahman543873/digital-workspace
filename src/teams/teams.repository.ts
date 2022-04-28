import qs from 'qs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RegisterUserTokenInput } from './inputs/register-user-token.input';
import { UserRepository } from '../user/user.repository';
import { ObjectId } from 'mongoose';
import { User } from '../user/schema/user.schema';
import { TeamsResponse } from '../shared/interfaces/teams-response.interface';
import { EventsInput } from './inputs/events.input';
import { ConfidentialApplication } from '../shared/providers/confidential-client-app';
import { AuthenticationResult } from '@azure/msal-node';
import { BaseHttpException } from '../shared/exceptions/base-http-exception';

@Injectable()
export class TeamsRepository {
  constructor(
    private httpService: HttpService,
    private userRepository: UserRepository,
    private confidentialApplication: ConfidentialApplication,
  ) {}

  async events(user: User, input: EventsInput) {
    const date = input.date || Date.now();
    const todayNight = new Date(date);
    const todayMorning = new Date(date);
    todayNight.setHours(25);
    todayMorning.setHours(2);
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://graph.microsoft.com/v1.0/me/calendarView?startDateTime=${todayMorning.toISOString()}&endDateTime=${todayNight.toISOString()}&$select=subject,organizer,onlineMeeting,attendees,start,end`,
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
    } catch (error) {
      throw new BaseHttpException('EN', 400, error);
    }
  }

  async registerUserMicrosoft(userId: ObjectId, input: RegisterUserTokenInput) {
    let token: AuthenticationResult | null;
    try {
      token = await this.confidentialApplication.acquireTokenByCode({
        code: input.code,
        scopes: process.env.SCOPES.split(','),
        redirectUri: process.env.REDIRECT_URI,
      });
    } catch (error) {
      throw new BaseHttpException(null, 618, error);
    }
    return await this.userRepository.updateOne(
      { _id: userId },
      { microsoftToken: token },
    );
  }
}
