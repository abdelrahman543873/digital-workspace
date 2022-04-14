import { ApiBodyOptions } from '@nestjs/swagger';

export const CreateLeaveSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      startDate: {
        type: 'string',
        format: 'date',
      },
      endDate: {
        type: 'string',
        format: 'date',
      },
      reason: {
        type: 'string',
      },
      comment: {
        type: 'string',
        nullable: true,
      },
      replacement: {
        type: 'string',
        nullable: true,
      },
      attachments: {
        nullable: true,
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  },
};
