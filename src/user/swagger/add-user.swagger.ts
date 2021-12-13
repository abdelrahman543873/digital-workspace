import { ApiBodyOptions } from '@nestjs/swagger';

export const AddUserSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      isAdmin: {
        type: 'boolean',
      },
      isCompany: {
        type: 'boolean',
      },
      twitter: {
        type: 'string',
      },
      linkedin: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      fullName: {
        type: 'string',
      },
      nationality: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      experience: {
        type: 'string',
      },
      birthDate: {
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
