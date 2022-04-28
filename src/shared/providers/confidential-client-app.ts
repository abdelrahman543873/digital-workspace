import {
  ConfidentialClientApplication,
  Configuration,
  LogLevel,
} from '@azure/msal-node';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfidentialApplication extends ConfidentialClientApplication {
  constructor() {
    const config: Configuration = {
      auth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        knownAuthorities: [process.env.AUTHORITY],
      },
      system: {
        loggerOptions: {
          logLevel: LogLevel.Verbose,
          loggerCallback(level, message) {
            console.log(level, message);
          },
        },
      },
    };
    super(config);
  }
}
