import { ApiBodyOptions } from '@nestjs/swagger';

export const CreatePageSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      logo: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};
