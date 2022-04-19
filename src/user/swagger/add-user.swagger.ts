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
      yearsOfExperience: {
        type: 'number',
      },
      weddingDate: {
        type: 'string',
        format: 'date',
      },
      skills: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      education: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      status: {
        type: 'string',
      },
      governmentalId: {
        type: 'string',
      },
      visa: {
        type: 'string',
      },
      address: {
        type: 'string',
      },
      visaExpiryDate: {
        type: 'string',
        format: 'date',
      },
      emergencyContactNumber: {
        type: 'string',
      },
      bloodGroup: {
        type: 'string',
      },
      martialStatus: {
        type: 'string',
      },
    },
  },
};
