import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const createUser = {
  // eslint-disable-next-line no-undef
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'user',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
