import { ApiBodyOptions } from '@nestjs/swagger';
import { AddUserSwagger } from './add-user.swagger';

export const UpdateUserByIdSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      userId: { type: 'string', format: 'uuid' },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...AddUserSwagger.schema.properties,
    },
  },
};
