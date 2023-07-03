import { handlerPath } from '../../helper/handler-resolver';

export const incrementWebsiteAccess = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/website/increment',
      },
    },
  ],
};
