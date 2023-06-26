import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const incrementWebsiteAccess = {
  // eslint-disable-next-line no-undef
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'website/increment',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
