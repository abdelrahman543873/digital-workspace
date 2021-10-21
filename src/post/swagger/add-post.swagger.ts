import { ApiBodyOptions } from '@nestjs/swagger';

export const AddPostSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
      },
      attachments: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  },
};
