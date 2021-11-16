import { ApiBodyOptions } from '@nestjs/swagger';
import { PRIORITIES } from '../../app.const';

export const CreateTaskSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      assignee: {
        type: 'string',
      },
      title: { type: 'string' },
      description: { type: 'string' },
      priority: { type: 'string', enum: PRIORITIES },
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
