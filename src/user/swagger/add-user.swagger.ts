import { ApiBodyOptions } from '@nestjs/swagger';
import { GENDER, WIDGETS } from '../../app.const';

export const AddUserSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      isAdmin: {
        type: 'boolean',
      },
      phone: {
        type: 'string',
        format: 'mobile',
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
        type: 'array',
        items: {
          type: 'object',
          properties: {
            logo: { type: 'string', format: 'uri' },
            name: { type: 'string' },
            position: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
          },
        },
      },
      birthDate: {
        type: 'string',
        format: 'date',
      },
      position: {
        type: 'string',
      },
      description: { type: 'string' },
      directManagerId: { type: 'string', format: 'uuid' },
      level: { type: 'string', format: 'uuid' },
      country: { type: 'string', format: 'uuid' },
      department: { type: 'string', format: 'uuid' },
      employmentType: { type: 'string', format: 'uuid' },
      title: { type: 'string', format: 'uuid' },
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
          format: 'uuid',
        },
      },
      interests: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uuid',
        },
      },
      education: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            logo: { type: 'string', format: 'uri' },
            university: { type: 'string' },
            major: { type: 'string' },
            level: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
          },
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
      gender: {
        type: 'string',
        enum: GENDER,
      },
      widgets: {
        type: 'string',
        enum: WIDGETS,
      },
      passport: {
        type: 'string',
      },
      contractEndDate: {
        type: 'string',
        format: 'date',
      },
      internshipEndDate: {
        type: 'string',
        format: 'date',
      },
      exitDate: {
        type: 'string',
        format: 'date',
      },
      resignationDate: {
        type: 'string',
        format: 'date',
      },
      personalEmail: {
        type: 'string',
      },
      exitReason: {
        type: 'string',
      },
    },
  },
};
