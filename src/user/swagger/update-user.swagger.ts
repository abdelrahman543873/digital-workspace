import { ApiBodyOptions } from '@nestjs/swagger';
import { AddUserSwagger } from './add-user.swagger';

export const UpdateUserSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      newPassword: { type: 'string' },
      ...AddUserSwagger.schema.properties,
    },
  },
};
