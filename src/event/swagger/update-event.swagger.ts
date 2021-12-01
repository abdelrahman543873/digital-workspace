import { ApiBodyOptions } from '@nestjs/swagger';

export const UpdateEventSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      eventId: { type: 'string' },
      title: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      date: {
        type: 'string',
      },
      logo: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};
