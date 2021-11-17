import { ApiBodyOptions } from '@nestjs/swagger';

export const CreateEventSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
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
