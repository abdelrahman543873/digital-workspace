import { ApiResponseOptions } from '@nestjs/swagger';

export const MicrosoftLogin: ApiResponseOptions = {
  status: 302,
  headers: {
    Location: {
      description: 'redirection to microsoft SSO',
      schema: { type: 'string', format: 'uri' },
    },
  },
};
