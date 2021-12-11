import { ApiBodyOptions } from '@nestjs/swagger';

export const UpdateUserByIdSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      isAdmin: {
        type: 'boolean',
      },
      isCompany: {
        type: 'boolean',
      },
      userId: { type: 'string' },
      fullName: {
        type: 'string',
      },
      nationality: {
        type: 'string',
      },
      birthDate: {
        type: 'string',
        format: 'date',
      },
      experience: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      position: {
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
