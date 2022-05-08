import { ApiBodyOptions } from '@nestjs/swagger';
import { AddUserSwagger } from './add-user.swagger';

export const UpdateUserSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      newPassword: { type: 'string' },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...AddUserSwagger.schema.properties,
    },
  },
};
