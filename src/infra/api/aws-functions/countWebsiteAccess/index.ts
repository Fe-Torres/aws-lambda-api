import { handlerPath } from '../../helper/handler-resolver';

export const countWebsiteAccess = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/website',
      },
    },
  ],
};
