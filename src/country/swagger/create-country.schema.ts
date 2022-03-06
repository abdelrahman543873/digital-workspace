import { ApiBodyOptions } from '@nestjs/swagger';

export const CreateCountrySwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      logo: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};
