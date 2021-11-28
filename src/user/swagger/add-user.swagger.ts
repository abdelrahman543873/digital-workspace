import { ApiBodyOptions } from '@nestjs/swagger';

export const AddUserSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
      },
      fullName: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      experience: {
        type: 'string',
      },
      description: { type: 'string' },
      directManagerId: { type: 'string' },
      profilePic: {
        type: 'string',
        format: 'binary',
      },
      coverPic: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};
