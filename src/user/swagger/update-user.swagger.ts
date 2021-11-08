import { ApiBodyOptions } from '@nestjs/swagger';

export const UpdateUserSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      newPassword: {
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
