import { handlerPath } from '@libs/handler-resolver';

export const countWebsiteAccess = {
  // eslint-disable-next-line no-undef
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'website/{url}',
      },
    },
  ],
};
