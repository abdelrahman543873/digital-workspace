import { ApiBodyOptions } from '@nestjs/swagger';

export const UpdatePageSwagger: ApiBodyOptions = {
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
