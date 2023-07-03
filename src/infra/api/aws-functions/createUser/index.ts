import { handlerPath } from '../../helper/handler-resolver';

export const createUser = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/user',

      },
    },
  ],
};
