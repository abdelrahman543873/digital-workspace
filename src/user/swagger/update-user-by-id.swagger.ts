import { ApiBodyOptions } from '@nestjs/swagger';

export const UpdateUserByIdSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
      fullName: {
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
