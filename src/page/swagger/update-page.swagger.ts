import { ApiBodyOptions } from '@nestjs/swagger';

export const UpdatePageSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      pageId: {
        type: 'string',
      },
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
