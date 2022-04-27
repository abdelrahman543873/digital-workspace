import { ApiBodyOptions } from '@nestjs/swagger';
import { AddUserSwagger } from './add-user.swagger';

export const UpdateUserByIdSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      userId: { type: 'string', format: 'uuid' },
      ...AddUserSwagger.schema.properties,
    },
  },
};
