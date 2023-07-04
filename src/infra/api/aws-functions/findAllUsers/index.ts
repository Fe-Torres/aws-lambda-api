import { handlerPath } from '../../helper/handler-resolver';

export const findAllUsers = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/user',
      },
    },
  ],
};
