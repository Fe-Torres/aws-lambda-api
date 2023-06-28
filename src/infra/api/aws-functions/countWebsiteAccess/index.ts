import { handlerPath } from '@libs/handler-resolver';

export const countWebsiteAccess = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'website',
      },
    },
  ],
};
